const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const I18nText = sequelize.define('I18nText', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  key_path: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  en: DataTypes.TEXT,
  th: DataTypes.TEXT,
  cn: DataTypes.TEXT,
  category: DataTypes.STRING, // e.g., "nav", "hero", "about", "footer"
  description: DataTypes.STRING, // e.g., "Home page title"
}, {
  tableName: 'i18n_texts',
  timestamps: true,
  underscored: true,
});

module.exports = I18nText;