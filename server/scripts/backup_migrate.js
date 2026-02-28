// server/scripts/backup_migrate.js
const fs = require('fs');
const path = require('path');
const Product = require('../models/Product');
const I18nText = require('../models/I18nText');
const SiteConfig = require('../models/SiteConfig');
const { sequelize } = require('../config/database');
require('dotenv').config();

const backupData = async () => {
  try {
    await sequelize.authenticate();
    console.log('⏳ Database connected. Fetching current data...');

    // ดึงข้อมูลทั้งหมดจากฐานข้อมูล
    const products = await Product.findAll({ raw: true });
    const i18nTexts = await I18nText.findAll({ raw: true });

    // ตัดช่อง id, created_at, updated_at ออก เพื่อให้เวลา Migrate ใหม่ id จะได้รันอัตโนมัติไม่ชนกัน
    const cleanProducts = products.map(p => {
      const { id, created_at, updated_at, ...rest } = p;
      return rest;
    });

    const cleanI18n = i18nTexts.map(t => {
      const { id, created_at, updated_at, ...rest } = t;
      return rest;
    });

    // สร้างเนื้อหาไฟล์ migrate_data.js ใหม่
    const fileContent = `const Product = require('../models/Product');
const I18nText = require('../models/I18nText');
const { sequelize } = require('../config/database');
require('dotenv').config();

const PRODUCTS_FROM_CONSTANTS = ${JSON.stringify(cleanProducts, null, 2)};

const I18N_TEXTS = ${JSON.stringify(cleanI18n, null, 2)};

const migrateData = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected.');

    console.log('🧹 Cleaning old data...');
    await I18nText.destroy({ where: {}, truncate: true });
    // ใช้คำสั่งนี้ถ้าอยากลบสินค้าเก่าด้วย หรือจะปิดไว้ก็ได้ถ้าอยากให้อัปเดตแทน
    // await Product.destroy({ where: {}, truncate: true });

    console.log('🛒 Migrating products...');
    await Product.bulkCreate(PRODUCTS_FROM_CONSTANTS, { updateOnDuplicate: ['name_en', 'name_th', 'name_cn', 'description_en', 'description_th', 'description_cn', 'price', 'price_max', 'show_price', 'category_en', 'category_th', 'category_cn', 'image_url', 'detail_images', 'is_featured', 'is_active'] });

    console.log('🌐 Migrating i18n texts...');
    await I18nText.bulkCreate(I18N_TEXTS, { updateOnDuplicate: ['en', 'th', 'cn', 'category', 'description'] });

    console.log('\\n🎉 All data migrated successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

migrateData();
`;

    // บันทึกทับไฟล์ migrate_data.js เดิม
    const outputPath = path.join(__dirname, 'migrate_data.js');
    fs.writeFileSync(outputPath, fileContent, 'utf8');
    
    console.log(`✅ Backup successfully! Data exported to ${outputPath}`);
    
  } catch (error) {
    console.error('❌ Error exporting data:', error);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

backupData();