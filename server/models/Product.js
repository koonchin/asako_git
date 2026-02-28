const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name_en: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name_th: DataTypes.STRING,
  name_cn: DataTypes.STRING,
  description_en: DataTypes.TEXT,
  description_th: DataTypes.TEXT,
  description_cn: DataTypes.TEXT,
  price: DataTypes.DECIMAL(10, 2),
  price_max: { // ✅ เพิ่มราคาขายสูงสุด (ถ้าราคาไม่เท่ากันจะแสดงเป็นช่วง)
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  show_price: { // ✅ เพิ่มสวิตช์ปิด/เปิดการโชว์ราคา
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  category_en: DataTypes.STRING,
  category_th: DataTypes.STRING,
  category_cn: DataTypes.STRING,
  image_url: DataTypes.STRING,
  detail_images: {
    type: DataTypes.TEXT, // เก็บเป็น JSON String เช่น '["/uploads/a.jpg", "/uploads/b.jpg"]'
    allowNull: true,
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  tableName: 'products',
  timestamps: true,
  underscored: true,
  indexes: [
    { fields: ['category_en'] },
    { fields: ['is_featured'] },
  ],
});

module.exports = Product;