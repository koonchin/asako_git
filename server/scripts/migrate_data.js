const Product = require('../models/Product');
const I18nText = require('../models/I18nText');
const { sequelize } = require('../config/database');
require('dotenv').config();

const PRODUCTS_FROM_CONSTANTS = [
  {
    "name_en": "Water Pump",
    "name_th": "ปั๊มน้ำ",
    "name_cn": "水泵",
    "description_en": "",
    "description_th": "",
    "description_cn": "",
    "price": "0.00",
    "price_max": "0.00",
    "show_price": 0,
    "category_en": "Water Systems",
    "category_th": "ระบบน้ำ",
    "category_cn": "供水系统",
    "image_url": "/uploads/1772317134752-744387850.jpg",
    "detail_images": "[\"/uploads/1772317155273-281501315.jpg\",\"/uploads/1772317155277-985377078.jpg\",\"/uploads/1772317155281-682338012.jpg\",\"/uploads/1772317155285-441409962.jpg\",\"/uploads/1772317155290-361556591.jpg\",\"/uploads/1772317155294-553836420.jpg\",\"/uploads/1772317155298-798067702.jpg\",\"/uploads/1772317155304-388385670.jpg\"]",
    "is_featured": 1,
    "is_active": 1,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T22:23:57.000Z"
  },
  {
    "name_en": "Large Wood Crusher",
    "name_th": "หัวบดย่อยซากพืช",
    "name_cn": "大型木材粉碎机",
    "description_en": "",
    "description_th": "",
    "description_cn": "",
    "price": "0.00",
    "price_max": "0.00",
    "show_price": 1,
    "category_en": "Crusher",
    "category_th": "เครื่องบดย่อย",
    "category_cn": "粉碎机",
    "image_url": "/uploads/1772317212289-993340888.jpg",
    "detail_images": "[\"/uploads/1772317225790-889169633.jpg\",\"/uploads/1772317225795-112870932.jpg\",\"/uploads/1772317225800-858553546.jpg\",\"/uploads/1772317225805-110819323.jpg\",\"/uploads/1772317233840-318658064.jpg\",\"/uploads/1772317233848-914084751.jpg\"]",
    "is_featured": 1,
    "is_active": 1,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T22:20:36.000Z"
  },
  {
    "name_en": "Colloid Mill & Super Fine Mill",
    "name_th": "เครื่องบดจุลภาค",
    "name_cn": "胶体磨",
    "description_en": "",
    "description_th": "",
    "description_cn": "",
    "price": "0.00",
    "price_max": "0.00",
    "show_price": 0,
    "category_en": "Processing",
    "category_th": "แปรรูปอาหาร",
    "category_cn": "胶体磨",
    "image_url": "/uploads/1772317302458-198240940.jpg",
    "detail_images": "[\"/uploads/1772317307490-495238978.jpg\",\"/uploads/1772317307497-523491835.jpg\",\"/uploads/1772317318078-413996645.jpg\",\"/uploads/1772317318082-523851921.jpg\",\"/uploads/1772317318087-403820340.jpg\",\"/uploads/1772317318093-500718520.jpg\",\"/uploads/1772317318098-396746220.jpg\"]",
    "is_featured": 1,
    "is_active": 1,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T22:22:00.000Z"
  },
  {
    "name_en": "Cap Sealing Machine",
    "name_th": "เครื่องซีลฝา",
    "name_cn": "封盖机",
    "description_en": "",
    "description_th": "",
    "description_cn": "",
    "price": "0.00",
    "price_max": "0.00",
    "show_price": 0,
    "category_en": "Packaging",
    "category_th": "บรรจุภัณฑ์",
    "category_cn": "包装设备",
    "image_url": "/uploads/1772317396911-645697266.jpg",
    "detail_images": "[\"/uploads/1772317400663-573317566.jpg\",\"/uploads/1772317400669-31541496.jpg\",\"/uploads/1772317406517-815923725.jpg\",\"/uploads/1772317406525-69960569.jpg\",\"/uploads/1772317406533-220732567.jpg\",\"/uploads/1772317406539-291239189.jpg\",\"/uploads/1772317406547-11365705.jpg\",\"/uploads/1772317406554-313302886.jpg\",\"/uploads/1772317406559-486923001.jpg\"]",
    "is_featured": 1,
    "is_active": 1,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T22:23:45.000Z"
  },
  {
    "name_en": "Centrifugal Pump",
    "name_th": "ปั้มน้ําแรงดันสูง ใช้กับสปริงเกอร์",
    "name_cn": "离心泵",
    "description_en": "",
    "description_th": "",
    "description_cn": "",
    "price": "0.00",
    "price_max": "0.00",
    "show_price": 0,
    "category_en": "Water Systems",
    "category_th": "ระบบน้ำ",
    "category_cn": "供水系统",
    "image_url": "/uploads/1772317459617-333357987.jpg",
    "detail_images": "[\"/uploads/1772317488488-986259798.jpg\",\"/uploads/1772317488494-723838218.jpg\",\"/uploads/1772317496352-475452094.jpg\",\"/uploads/1772317496358-399364191.jpg\",\"/uploads/1772317496365-873189896.jpg\",\"/uploads/1772317496369-284372204.jpg\"]",
    "is_featured": 1,
    "is_active": 1,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T22:24:58.000Z"
  },
  {
    "name_en": "Plant Waste Crusher",
    "name_th": "เครื่องบดย่อยซากพืช",
    "name_cn": "植物残渣粉碎机",
    "description_en": "",
    "description_th": "",
    "description_cn": "",
    "price": "0.00",
    "price_max": "0.00",
    "show_price": 0,
    "category_en": "Crusher",
    "category_th": "เครื่องบดย่อย",
    "category_cn": "粉碎机",
    "image_url": "/uploads/1772317515919-707727091.jpg",
    "detail_images": "[\"/uploads/1772317552915-705965195.jpg\",\"/uploads/1772317552921-115958704.jpg\",\"/uploads/1772317564893-174742880.jpg\",\"/uploads/1772317564899-14266753.jpg\"]",
    "is_featured": 1,
    "is_active": 1,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T22:26:06.000Z"
  },
  {
    "name_en": "Stainless Steel Pressure Cooker",
    "name_th": "หม้อแรงดัน",
    "name_cn": "不锈钢防爆压力锅",
    "description_en": "",
    "description_th": "",
    "description_cn": "",
    "price": "0.00",
    "price_max": "0.00",
    "show_price": 0,
    "category_en": "Processing",
    "category_th": "แปรรูปอาหาร",
    "category_cn": "加工设备",
    "image_url": "/uploads/1772317573989-934885830.jpg",
    "detail_images": "[\"/uploads/1772317608981-354400720.jpg\",\"/uploads/1772317608987-791746556.jpg\",\"/uploads/1772317614715-482304563.jpg\",\"/uploads/1772317614719-289413450.jpg\",\"/uploads/1772317614724-212691787.jpg\",\"/uploads/1772317614728-534668559.jpg\",\"/uploads/1772317614732-746527434.jpg\"]",
    "is_featured": 1,
    "is_active": 1,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T22:26:57.000Z"
  },
  {
    "name_en": "Automatic Sealer Machine",
    "name_th": "เครื่องซีลต่อเนื่อง",
    "name_cn": "自动封口机",
    "description_en": "",
    "description_th": "",
    "description_cn": "",
    "price": "0.00",
    "price_max": "0.00",
    "show_price": 0,
    "category_en": "Packaging",
    "category_th": "บรรจุภัณฑ์",
    "category_cn": "包装设备",
    "image_url": "/uploads/1772317631643-780262940.jpg",
    "detail_images": "[\"/uploads/1772317662627-800332526.jpg\",\"/uploads/1772317662636-352481337.jpg\",\"/uploads/1772317665818-225222431.jpg\",\"/uploads/1772317665824-828404393.jpg\",\"/uploads/1772317665828-468494964.jpg\"]",
    "is_featured": 1,
    "is_active": 1,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T22:27:47.000Z"
  },
  {
    "name_en": "Hand Sealing Machine",
    "name_th": "เครื่องซีลมือ",
    "name_cn": "手压封口机",
    "description_en": "",
    "description_th": "",
    "description_cn": "",
    "price": "0.00",
    "price_max": "0.00",
    "show_price": 1,
    "category_en": "Packaging",
    "category_th": "บรรจุภัณฑ์",
    "category_cn": "包装设备",
    "image_url": "/uploads/1772317674215-227125716.jpg",
    "detail_images": "[\"/uploads/1772317695192-568969948.jpg\",\"/uploads/1772317695198-888437186.jpg\",\"/uploads/1772317700925-270066049.jpg\",\"/uploads/1772317700929-634377958.jpg\",\"/uploads/1772317700934-756030935.jpg\"]",
    "is_featured": 1,
    "is_active": 1,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T22:28:22.000Z"
  },
  {
    "name_en": "Stainless Steel Herbal Grinder",
    "name_th": "เครื่องบดสมุนไพรจีน สแตนเลส",
    "name_cn": "不锈钢中药粉碎机",
    "description_en": "",
    "description_th": "",
    "description_cn": "",
    "price": "0.00",
    "price_max": "0.00",
    "show_price": 1,
    "category_en": "Processing",
    "category_th": "แปรรูปอาหาร",
    "category_cn": "加工设备",
    "image_url": "/uploads/1772317719204-101704654.jpg",
    "detail_images": "[\"/uploads/1772317722399-229754076.jpg\",\"/uploads/1772317722407-551051459.jpg\",\"/uploads/1772317764968-330868827.jpg\",\"/uploads/1772317764975-533434786.jpg\",\"/uploads/1772317764978-700864009.jpg\",\"/uploads/1772317764984-196347599.jpg\",\"/uploads/1772317764991-481565473.jpg\"]",
    "is_featured": 1,
    "is_active": 1,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T22:29:27.000Z"
  },
  {
    "name_en": "Grinding Mill",
    "name_th": "เครื่องบดป่น",
    "name_cn": "磨粉机",
    "description_en": "",
    "description_th": "",
    "description_cn": "",
    "price": "0.00",
    "price_max": "0.00",
    "show_price": 0,
    "category_en": "Processing",
    "category_th": "แปรรูปอาหาร",
    "category_cn": "加工设备",
    "image_url": "/uploads/1772317799463-411840692.jpg",
    "detail_images": "[\"/uploads/1772317803482-90995910.jpg\",\"/uploads/1772317803489-563210002.jpg\",\"/uploads/1772317835269-802370583.jpg\",\"/uploads/1772317835275-64220584.jpg\",\"/uploads/1772317835280-725129174.jpg\",\"/uploads/1772317835285-935599717.jpg\",\"/uploads/1772317835290-438737649.jpg\",\"/uploads/1772317835294-955046346.jpg\",\"/uploads/1772317835298-55949872.jpg\",\"/uploads/1772317835302-967144853.jpg\",\"/uploads/1772317835307-289032541.jpg\"]",
    "is_featured": 1,
    "is_active": 1,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T22:30:37.000Z"
  },
  {
    "name_en": "Vibrating Sieve",
    "name_th": "เครื่องร่อน",
    "name_cn": "旋振筛参数",
    "description_en": "",
    "description_th": "ง, เสียงเงียบ",
    "description_cn": "",
    "price": "0.00",
    "price_max": "0.00",
    "show_price": 0,
    "category_en": "Processing",
    "category_th": "แปรรูปอาหาร",
    "category_cn": "加工设备",
    "image_url": "/uploads/1772317844442-617628828.jpg",
    "detail_images": "[\"/uploads/1772317847616-959783212.jpg\",\"/uploads/1772317847628-765446861.jpg\",\"/uploads/1772317867543-604139170.jpg\",\"/uploads/1772317867548-54958742.jpg\",\"/uploads/1772317867552-623068338.jpg\"]",
    "is_featured": 1,
    "is_active": 1,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T22:31:09.000Z"
  },
  {
    "name_en": "Oil Press Machine",
    "name_th": "เครื่องอัดเม็ด อาหารสัตว์",
    "name_cn": "榨油机",
    "description_en": "",
    "description_th": "",
    "description_cn": "",
    "price": "0.00",
    "price_max": "0.00",
    "show_price": 0,
    "category_en": "Processing",
    "category_th": "แปรรูปอาหาร",
    "category_cn": "加工设备",
    "image_url": "/uploads/1772317884650-113239473.jpg",
    "detail_images": "[\"/uploads/1772317893155-148402411.jpg\",\"/uploads/1772317893163-882924182.jpg\",\"/uploads/1772317934454-822063456.jpg\",\"/uploads/1772317934462-676125123.jpg\"]",
    "is_featured": 1,
    "is_active": 1,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T22:32:18.000Z"
  },
  {
    "name_en": "Ozone Generator",
    "name_th": "เครื่องโอโซน",
    "name_cn": "工业臭氧发生器",
    "description_en": "",
    "description_th": "",
    "description_cn": "",
    "price": "0.00",
    "price_max": "0.00",
    "show_price": 1,
    "category_en": "Ozone",
    "category_th": "เครื่องโอโซน",
    "category_cn": "工业臭氧发生器",
    "image_url": "/uploads/1772317036423-407033337.jpg",
    "detail_images": "[\"/uploads/1772317040112-431803436.jpg\",\"/uploads/1772317040119-422739675.jpg\",\"/uploads/1772317040124-709273781.jpg\"]",
    "is_featured": 1,
    "is_active": 1,
    "createdAt": "2026-02-28T22:17:22.000Z",
    "updatedAt": "2026-02-28T22:22:39.000Z"
  },
  {
    "name_en": "Soybean Milk Grinding Machine",
    "name_th": "เครื่องบดคั้นนมถั่วเหลือง",
    "name_cn": "豆浆磨浆机",
    "description_en": "",
    "description_th": "",
    "description_cn": "",
    "price": "0.00",
    "price_max": "0.00",
    "show_price": 0,
    "category_en": "Grinding Machine",
    "category_th": "เครื่องบดคั้น",
    "category_cn": "豆浆磨浆机",
    "image_url": "/uploads/1772317114597-752080691.jpg",
    "detail_images": "[\"/uploads/1772317118208-430930627.jpg\",\"/uploads/1772317118214-721973668.jpg\",\"/uploads/1772317118218-848129041.jpg\"]",
    "is_featured": 0,
    "is_active": 1,
    "createdAt": "2026-02-28T22:18:40.000Z",
    "updatedAt": "2026-02-28T22:22:25.000Z"
  }
];

const I18N_TEXTS = [
  {
    "key_path": "nav.inventory",
    "en": "Inventory",
    "th": "สินค้า",
    "cn": "库存",
    "category": "nav",
    "description": null,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T21:29:56.000Z"
  },
  {
    "key_path": "nav.services",
    "en": "Services",
    "th": "บริการ",
    "cn": "服务",
    "category": "nav",
    "description": null,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T21:29:56.000Z"
  },
  {
    "key_path": "nav.about",
    "en": "About Us",
    "th": "เกี่ยวกับเรา",
    "cn": "关于我们",
    "category": "nav",
    "description": null,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T21:29:56.000Z"
  },
  {
    "key_path": "nav.contact",
    "en": "Contact",
    "th": "ติดต่อ",
    "cn": "联系我们",
    "category": "nav",
    "description": null,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T21:29:56.000Z"
  },
  {
    "key_path": "nav.inquire",
    "en": "Inquire",
    "th": "สอบถามข้อมูล",
    "cn": "咨询",
    "category": "nav",
    "description": null,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T21:29:56.000Z"
  },
  {
    "key_path": "hero.badge",
    "en": "Trusted for over 30 Years",
    "th": "เครดิตมากกว่า 30 ปี แห่งความไว้วางใจ",
    "cn": "超过30年的信誉保证",
    "category": "hero",
    "description": null,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T21:29:56.000Z"
  },
  {
    "key_path": "hero.title_line1",
    "en": "ASAKO",
    "th": "ASAKO",
    "cn": "ASAKO",
    "category": "hero",
    "description": null,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T21:29:56.000Z"
  },
  {
    "key_path": "hero.title_line2",
    "en": "THAILAND",
    "th": "THAILAND",
    "cn": "THAILAND",
    "category": "hero",
    "description": null,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T21:29:56.000Z"
  },
  {
    "key_path": "hero.subtitle",
    "en": "The first pioneer in Thailand...",
    "th": "เจ้าแรกๆ ในไทยที่นำเครื่องจักรราคาดี...",
    "cn": "泰国首批引进海外优质平价机械...",
    "category": "hero",
    "description": null,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T21:29:56.000Z"
  },
  {
    "key_path": "hero.view_catalog",
    "en": "View Products",
    "th": "ดูสินค้าทั้งหมด",
    "cn": "查看产品",
    "category": "hero",
    "description": null,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T21:29:56.000Z"
  },
  {
    "key_path": "about.badge",
    "en": "The Founder",
    "th": "ผู้ก่อตั้ง",
    "cn": "创始人",
    "category": "about",
    "description": null,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T21:29:56.000Z"
  },
  {
    "key_path": "about.title",
    "en": "Surin Songthanin",
    "th": "คุณสุรินทร์   ส่งทานินทร์",
    "cn": "Surin Songthanin (苏林)",
    "category": "about",
    "description": null,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T21:29:56.000Z"
  },
  {
    "key_path": "about.slogan",
    "en": "Like a thoughtful partner...",
    "th": "เหมือนเพื่อนคู่คิด...",
    "cn": "像贴心伙伴一样...",
    "category": "about",
    "description": null,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T21:29:56.000Z"
  },
  {
    "key_path": "highlights.title",
    "en": "THAI ASAKO",
    "th": "THAI ASAKO",
    "cn": "THAI ASAKO",
    "category": "services",
    "description": null,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T21:29:56.000Z"
  },
  {
    "key_path": "highlights.item1_t",
    "en": "Experience",
    "th": "ประสบการณ์",
    "cn": "经验",
    "category": "services",
    "description": null,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T21:29:56.000Z"
  },
  {
    "key_path": "common.inquire",
    "en": "Inquire Now",
    "th": "สอบถามทันที",
    "cn": "立即咨询",
    "category": "common",
    "description": null,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T21:29:56.000Z"
  },
  {
    "key_path": "download.title",
    "en": "Download Catalog Here!",
    "th": "ดาวน์โหลดแคตตาล็อกได้แล้ว ที่นี่!",
    "cn": "在此下载产品目录！",
    "category": "common",
    "description": null,
    "createdAt": "2026-02-28T21:29:56.000Z",
    "updatedAt": "2026-02-28T21:29:56.000Z"
  }
];

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

    console.log('\n🎉 All data migrated successfully!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

migrateData();
