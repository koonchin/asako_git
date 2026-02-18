const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name_en: DataTypes.STRING,
  name_th: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  message_en: DataTypes.TEXT,
  message_th: DataTypes.TEXT,
  subject_en: DataTypes.STRING,
  subject_th: DataTypes.STRING,
  is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'contacts',
  timestamps: true,
  underscored: true,
  indexes: [
    { fields: ['created_at'] },
    { fields: ['is_read'] },
  ],
});

module.exports = Contact;