const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SiteConfig = sequelize.define('SiteConfig', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  phone: DataTypes.STRING,
  email: DataTypes.STRING,
  address_en: DataTypes.TEXT,
  address_th: DataTypes.TEXT,
  address_cn: DataTypes.TEXT,
  about_us_en: DataTypes.TEXT,
  about_us_th: DataTypes.TEXT,
  about_us_cn: DataTypes.TEXT,
  hero_image_url: DataTypes.STRING,
  hero_title_en: DataTypes.STRING,
  hero_title_th: DataTypes.STRING,
  hero_title_cn: DataTypes.STRING,
  hero_subtitle_en: DataTypes.STRING,
  hero_subtitle_th: DataTypes.STRING,
  hero_subtitle_cn: DataTypes.STRING,
  facebook_url: DataTypes.STRING,
  instagram_url: DataTypes.STRING,
  line_url: DataTypes.STRING,
  map_url: DataTypes.TEXT
}, {
  tableName: 'site_config',
  timestamps: true,
  underscored: true,
});

module.exports = SiteConfig;