const Product = require('../models/Product');
const SiteConfig = require('../models/SiteConfig');
const I18nText = require('../models/I18nText');
const { sequelize } = require('../config/database');
require('dotenv').config();

const PRODUCTS_FROM_CONSTANTS = [
  { name_en: 'Water Pump', name_th: 'ปั๊มน้ำ', name_cn: '水泵', category_en: 'Water Systems', category_th: 'ระบบน้ำ', category_cn: '供水系统', price: 12500, image_url: '/images/1/1.jpg', is_featured: true, is_active: true, description_en: '1 HP Power, Flow: 300 L/min, Inlet: 1 Inch', description_th: 'กำลัง 1 แรงม้า, อัตราไหล 300 ลิตร/นาที, ท่อเข้า 1 นิ้ว', description_cn: '功率 1 马力, 流量 300 升/分, 进水口 1 英寸' },
  { name_en: 'Large Wood Chipper', name_th: 'เครื่องบดไม้ย่อยขนาดใหญ่', name_cn: '大型木材粉碎机', category_en: 'Shredders', category_th: 'เครื่องบดย่อย', category_cn: '粉碎机', price: 158000, image_url: '/images/2/1.jpg', is_featured: true, is_active: true, description_en: 'Diesel Engine, Max Log: 10 Inch, Capacity: 3 Ton/hr', description_th: 'เครื่องยนต์ดีเซล, รองรับไม้ใหญ่สุด 10 นิ้ว, กำลังผลิต 3 ตัน/ชม.', description_cn: '柴油发动机, 最大原木 10 英寸, 产量 3 吨/小时' },
  { name_en: 'Micro Powder Grinder', name_th: 'เครื่องบดจุลภาค', name_cn: '微粉磨', category_en: 'Processing', category_th: 'แปรรูปอาหาร', category_cn: '加工设备', price: 64500, image_url: '/images/3/1.jpg', is_featured: true, is_active: true, description_en: 'Ultra-Fine Mesh, Speed: 25000 RPM, Stainless 304', description_th: 'ความละเอียดสูง (ระดับไมครอน), ความเร็ว 25,000 รอบ/นาที, สแตนเลส 304', description_cn: '超细网目, 转速 25000 转/分, 304 不锈钢' },
  { name_en: 'Cap Sealing Machine', name_th: 'เครื่องซีลฝา', name_cn: '封盖机', category_en: 'Packaging', category_th: 'บรรจุภัณฑ์', category_cn: '包装设备', price: 21000, image_url: '/images/4/1.jpg', is_featured: true, is_active: true, description_en: 'Auto-Feed, Speed: 1500 bph, Adjustable Height', description_th: 'ระบบป้อนฝาอัตโนมัติ, ความเร็ว 1,500 ขวด/ชม., ปรับความสูงได้', description_cn: '自动上盖, 速度 1500 瓶/小时, 高度可调' },
  { name_en: 'Centrifugal Pump', name_th: 'ปั๊มน้ำหอยโข่ง', name_cn: '离心泵', category_en: 'Water Systems', category_th: 'ระบบน้ำ', category_cn: '供水系统', price: 32000, image_url: '/images/5/1.jpg', is_featured: false, is_active: true, description_en: 'High Head, Power: 3 HP, Cast Iron Body', description_th: 'แรงดันส่งสูง, กำลัง 3 แรงม้า, เสื้อปั๊มเหล็กหล่อ', description_cn: '高扬程, 功率 3 马力, 铸铁泵体' },
  { name_en: 'Plant Residue Shredder', name_th: 'เครื่องบดย่อยซากพืช', name_cn: '植物残渣粉碎机', category_en: 'Shredders', category_th: 'เครื่องบดย่อย', category_cn: '粉碎机', price: 41000, image_url: '/images/6/1.jpg', is_featured: false, is_active: true, description_en: 'Bio-Mulch Output, Heavy Duty Blades, PTO Driven', description_th: 'ผลิตปุ๋ยหมักชีวภาพ, ใบมีดเหล็กกล้า, ขับเคลื่อนด้วย PTO', description_cn: '生物覆盖物产出, 重型刀片, PTO 驱动' },
  { name_en: 'Industrial Pressure Cooker', name_th: 'หม้อแรงดัน', name_cn: '工业高压锅', category_en: 'Processing', category_th: 'แปรรูปอาหาร', category_cn: '加工设备', price: 58000, image_url: '/images/7/1.jpg', is_featured: false, is_active: true, description_en: 'Capacity: 100L, Safety Valve, High Temp', description_th: 'ความจุ 100 ลิตร, วาล์วนิรภัยมาตรฐาน, ทนความร้อนสูง', description_cn: '容量 100 升, 安全阀, 耐高温' },
  { name_en: 'Automatic Sealer', name_th: 'เครื่องซีล Auto', name_cn: '自动封口机', category_en: 'Packaging', category_th: 'บรรจุภัณฑ์', category_cn: '包装设备', price: 120000, image_url: '/images/8/1.jpg', is_featured: false, is_active: true, description_en: 'Continuous Band, Temp Control, Date Printing', description_th: 'ซีลสายพานต่อเนื่อง, ควบคุมอุณหภูมิแม่นยำ, พิมพ์วันที่ผลิตในตัว', description_cn: '连续封口, 温控, 日期打印' },
  { name_en: 'Hand Sealer', name_th: 'เครื่องซีลมือ', name_cn: '手压封口机', category_en: 'Packaging', category_th: 'บรรจุภัณฑ์', category_cn: '包装设备', price: 1200, image_url: '/images/9/1.jpg', is_featured: false, is_active: true, description_en: 'Width: 300mm, Instant Heat, Portable', description_th: 'หน้ากว้างซีล 300 มม., ร้อนเร็วทันที, พกพาสะดวก', description_cn: '封口宽度 300mm, 速热, 便携式' },
  { name_en: 'Herb Grinder', name_th: 'เครื่องบดสมุนไพร', name_cn: '不锈钢中药粉碎机', category_en: 'Processing', category_th: 'แปรรูปอาหาร', category_cn: '加工设备', price: 12000, image_url: '/images/10/1.jpg', is_featured: false, is_active: true, description_en: 'Food Grade 304, High Speed Motor, Swing Type', description_th: 'เกรดอาหาร สแตนเลส 304, มอเตอร์รอบจัด, แบบโยกเทผงได้', description_cn: '食品级 304, 高速电机, 摇摆式' },
  { name_en: 'Universal Pulverizer', name_th: 'เครื่องบดป่น', name_cn: '万能粉碎机', category_en: 'Processing', category_th: 'แปรรูปอาหาร', category_cn: '加工设备', price: 15000, image_url: '/images/11/1.jpg', is_featured: false, is_active: true, description_en: 'Adjustable Fineness, Continuous Feed, Water Cooling', description_th: 'ปรับความละเอียดได้, ระบบป้อนต่อเนื่อง, ระบบหล่อเย็น', description_cn: '细度可调, 连续进料, 水冷系统' },
  { name_en: 'Vibrating Sieve', name_th: 'เครื่องร่อน', name_cn: '振动筛', category_en: 'Processing', category_th: 'แปรรูปอาหาร', category_cn: '加工设备', price: 18000, image_url: '/images/12/1.jpg', is_featured: false, is_active: true, description_en: 'Multi-Layer, High Frequency, Low Noise', description_th: 'ตะแกรง 2 ชั้น, การสั่นความถี่สูง, เสียงเงียบ', description_cn: '多层筛网, 高频振动, 低噪音' },
  { name_en: 'Oil Extractor', name_th: 'เครื่องสกัดน้ำมัน', name_cn: '榨油机', category_en: 'Processing', category_th: 'แปรรูปอาหาร', category_cn: '加工设备', price: 25000, image_url: '/images/13/1.jpg', is_featured: false, is_active: true, description_en: 'Cold Press, High Yield, Automatic', description_th: 'ระบบสกัดเย็น, อัตราการได้น้ำมันสูง, ทำงานอัตโนมัติ', description_cn: '冷榨, 出油率高, 全自动' }
];

const I18N_TEXTS = [
  // --- NAV (category: 'nav') ---
  { key_path: 'nav.inventory', en: 'Inventory', th: 'สินค้า', cn: '库存', category: 'nav' },
  { key_path: 'nav.services', en: 'Services', th: 'บริการ', cn: '服务', category: 'nav' },
  { key_path: 'nav.about', en: 'About Us', th: 'เกี่ยวกับเรา', cn: '关于我们', category: 'nav' },
  { key_path: 'nav.contact', en: 'Contact', th: 'ติดต่อ', cn: '联系我们', category: 'nav' },
  { key_path: 'nav.inquire', en: 'Inquire', th: 'สอบถามข้อมูล', cn: '咨询', category: 'nav' },

  // --- HERO (category: 'hero') ---
  { key_path: 'hero.badge', en: 'Trusted for over 30 Years', th: 'เครดิตมากกว่า 30 ปี แห่งความไว้วางใจ', cn: '超过30年的信誉保证', category: 'hero' },
  { key_path: 'hero.title_line1', en: 'ASAKO', th: 'ASAKO', cn: 'ASAKO', category: 'hero' },
  { key_path: 'hero.title_line2', en: 'THAILAND', th: 'THAILAND', cn: 'THAILAND', category: 'hero' },
  { key_path: 'hero.subtitle', en: 'The first pioneer in Thailand...', th: 'เจ้าแรกๆ ในไทยที่นำเครื่องจักรราคาดี...', cn: '泰国首批引进海外优质平价机械...', category: 'hero' },
  { key_path: 'hero.view_catalog', en: 'View Products', th: 'ดูสินค้าทั้งหมด', cn: '查看产品', category: 'hero' },

  // --- ABOUT (category: 'about') ---
  { key_path: 'about.badge', en: 'The Founder', th: 'ผู้ก่อตั้ง', cn: '创始人', category: 'about' },
  { key_path: 'about.title', en: 'Surin Songthanin', th: 'คุณสุรินทร์   ส่งทานินทร์', cn: 'Surin Songthanin (苏林)', category: 'about' },
  { key_path: 'about.slogan', en: 'Like a thoughtful partner...', th: 'เหมือนเพื่อนคู่คิด...', cn: '像贴心伙伴一样...', category: 'about' },

  // --- SERVICES (category: 'services') ---
  { key_path: 'highlights.title', en: 'THAI ASAKO', th: 'THAI ASAKO', cn: 'THAI ASAKO', category: 'services' },
  { key_path: 'highlights.item1_t', en: 'Experience', th: 'ประสบการณ์', cn: '经验', category: 'services' },

  // --- COMMON (category: 'common') ---
  { key_path: 'common.inquire', en: 'Inquire Now', th: 'สอบถามทันที', cn: '立即咨询', category: 'common' },
  { key_path: 'download.title', en: 'Download Catalog Here!', th: 'ดาวน์โหลดแคตตาล็อกได้แล้ว ที่นี่!', cn: '在此下载产品目录！', category: 'common' }
];

const migrateData = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected.');

    // ล้างข้อมูล i18n เก่าออกก่อนเพื่อให้แน่ใจว่า category ถูกต้อง
    console.log('🧹 Cleaning old I18n data...');
    await I18nText.destroy({ where: {}, truncate: true });

    console.log('🛒 Migrating products...');
    await Product.bulkCreate(PRODUCTS_FROM_CONSTANTS, { updateOnDuplicate: Object.keys(PRODUCTS_FROM_CONSTANTS[0]) });

    console.log('🌐 Migrating i18n texts...');
    await I18nText.bulkCreate(I18N_TEXTS);

    console.log('\n🎉 All data migrated successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

migrateData();