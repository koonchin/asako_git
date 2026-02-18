const Product = require('../models/Product');
const SiteConfig = require('../models/SiteConfig');
const I18nText = require('../models/I18nText');
const { sequelize } = require('../config/database');
require('dotenv').config();

// This is the sample data from constants.tsx
const PRODUCTS_FROM_CONSTANTS = [
  {
    name_en: 'Water Pump',
    name_th: 'ปั๊มน้ำ',
    name_cn: '水泵',
    description_en: 'High-quality water pump for agricultural use',
    description_th: 'ปั๊มน้ำคุณภาพสูงสำหรับการใช้ทางการเกษตร',
    description_cn: '用于农业用途的高品质水泵',
    price: 45000,
    category_en: 'Pumps',
    category_th: 'ปั๊ม',
    category_cn: '泵类',
    image_url: '/images/1/1.jpg',
    is_featured: true,
    is_active: true,
  },
  // ... add all other products from PRODUCTS constant
];

// I18n texts from i18n.ts
const I18N_TEXTS = [
  // NAV
  { key_path: 'nav.inventory', en: 'Inventory', th: 'สินค้า', cn: '库存', category: 'nav' },
  { key_path: 'nav.services', en: 'Services', th: 'บริการ', cn: '服务', category: 'nav' },
  { key_path: 'nav.about', en: 'About Us', th: 'เกี่ยวกับเรา', cn: '关于我们', category: 'nav' },
  { key_path: 'nav.contact', en: 'Contact', th: 'ติดต่อ', cn: '联系我们', category: 'nav' },
  
  // HERO
  { key_path: 'hero.badge', en: 'Trusted for over 30 Years', th: 'เครดิตมากกว่า 30 ปี แห่งความไว้วางใจ', cn: '超过30年的信誉保证', category: 'hero' },
  { key_path: 'hero.title_line1', en: 'ASAKO', th: 'ASAKO', cn: 'ASAKO', category: 'hero' },
  { key_path: 'hero.title_line2', en: 'THAILAND', th: 'THAILAND', cn: 'THAILAND', category: 'hero' },
  { key_path: 'hero.subtitle', en: 'The first pioneer in Thailand bringing high-quality machinery from global markets to you. From SMEs to Public Companies, we are your partner in business.', th: 'บริษัทเบิกทางแรกในไทยนำเครื่องจักรคุณภาพสูงจากตลาดโลกมาให้คุณ', cn: '泰国第一个先驱者为您带来全球市场高品质机械', category: 'hero' },
  
  // ABOUT
  { key_path: 'about.title', en: 'Surin Songthanin', th: 'สุรินทร์ สงค์ธนะนิน', cn: '苏林·松塔尼', category: 'about' },
  { key_path: 'about.role', en: 'Owner of ASAKO THAILAND', th: 'เจ้าของ ASAKO THAILAND', cn: 'ASAKO THAILAND 所有者', category: 'about' },
  
  // Add all other i18n texts...
];

const migrateData = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected.');

    console.log('\n📝 Starting comprehensive data migration...\n');

    // 1. Migrate Products
    console.log('🛒 Migrating products...');
    const createdProducts = await Product.bulkCreate(PRODUCTS_FROM_CONSTANTS, {
      ignoreDuplicates: true,
    });
    console.log(`   ✅ ${createdProducts.length} products created/updated.`);

    // 2. Migrate SiteConfig
    console.log('\n⚙️  Migrating site configuration...');
    let config = await SiteConfig.findOne();
    if (!config) {
      config = await SiteConfig.create({
        phone: '+66-2-123-4567',
        email: 'info@asako.local',
        address_en: 'Bangkok, Thailand',
        address_th: 'กรุงเทพฯ ประเทศไทย',
        address_cn: '曼谷，泰国',
        hero_image_url: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=1000',
        facebook_url: 'https://facebook.com/asako-agri',
        instagram_url: 'https://instagram.com/asako-agri',
        line_url: 'https://line.me/ti/p/@asako',
      });
      console.log('   ✅ Site config created.');
    } else {
      console.log('   ✅ Site config already exists.');
    }

    // 3. Migrate I18n Texts
    console.log('\n🌐 Migrating i18n texts...');
    const createdTexts = await I18nText.bulkCreate(I18N_TEXTS, {
      ignoreDuplicates: true,
    });
    console.log(`   ✅ ${createdTexts.length} i18n texts created/updated.`);

    console.log('\n✨ Migration Summary:');
    console.log(`   📦 Products: ${createdProducts.length}`);
    console.log(`   ⚙️  Config: 1`);
    console.log(`   🌐 I18n Texts: ${createdTexts.length}`);
    console.log('\n🎉 All data migrated successfully!');

  } catch (error) {
    console.error('❌ Error during migration:', error.message);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

migrateData();