const mysql = require('mysql2/promise');
require('dotenv').config();

const setupDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });

  try {
    console.log('🔧 Setting up database...');

    // Create database if it doesn't exist
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );
    console.log(`✅ Database '${process.env.DB_NAME}' created or already exists.`);

    // Switch to the new database
    await connection.query(`USE ${process.env.DB_NAME}`);

    // Create users table (Admin)
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Users table created.');

// Create products table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name_en VARCHAR(255) NOT NULL,
        name_th VARCHAR(255),
        name_cn VARCHAR(255),
        description_en LONGTEXT,
        description_th LONGTEXT,
        description_cn LONGTEXT,
        price DECIMAL(10, 2),
        price_max DECIMAL(10, 2) DEFAULT 0,
        show_price BOOLEAN DEFAULT TRUE,
        category_en VARCHAR(100),
        category_th VARCHAR(100),
        category_cn VARCHAR(100),
        image_url VARCHAR(500),
        detail_images LONGTEXT,
        is_featured BOOLEAN DEFAULT FALSE,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_category (category_en),
        INDEX idx_featured (is_featured)
      )
    `);
    
    console.log('✅ Products table created.');

    // Create site_config table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS site_config (
        id INT AUTO_INCREMENT PRIMARY KEY,
        phone VARCHAR(20),
        email VARCHAR(255),
        address_en LONGTEXT,
        address_th LONGTEXT,
        address_cn LONGTEXT,
        about_us_en LONGTEXT,
        about_us_th LONGTEXT,
        about_us_cn LONGTEXT,
        hero_image_url VARCHAR(500),
        hero_title_en VARCHAR(500),
        hero_title_th VARCHAR(500),
        hero_title_cn VARCHAR(500),
        hero_subtitle_en VARCHAR(500),
        hero_subtitle_th VARCHAR(500),
        hero_subtitle_cn VARCHAR(500),
        facebook_url VARCHAR(500),
        instagram_url VARCHAR(500),
        line_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Site config table created.');
// Add this AFTER site_config table creation in setup_db.js

// Create i18n_texts table
await connection.query(`
  CREATE TABLE IF NOT EXISTS i18n_texts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    key_path VARCHAR(255) UNIQUE NOT NULL,
    en LONGTEXT,
    th LONGTEXT,
    cn LONGTEXT,
    category VARCHAR(50),
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_key (key_path)
  )
`);
console.log('✅ i18n_texts table created.');

    // Create contacts table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name_en VARCHAR(255),
        name_th VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(20),
        message_en LONGTEXT,
        message_th LONGTEXT,
        subject_en VARCHAR(255),
        subject_th VARCHAR(255),
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_created (created_at),
        INDEX idx_read (is_read)
      )
    `);
    console.log('✅ Contacts table created.');

    // Create default admin user
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await connection.query(
      `INSERT IGNORE INTO users (username, password, email, role) VALUES (?, ?, ?, ?)`,
      ['admin', hashedPassword, 'admin@asako.local', 'admin']
    );
    console.log('✅ Default admin user created (username: admin, password: admin123)');

    // Create default site config entry
    await connection.query(`
      INSERT IGNORE INTO site_config (phone, email, address_en, about_us_en) 
      VALUES (?, ?, ?, ?)
    `, [
      '+66-2-123-4567',
      'info@asako.local',
      'Bangkok, Thailand',
      'Welcome to Asako'
    ]);
    console.log('✅ Default site config created.');

    console.log('\n🎉 Database setup completed successfully!');
    console.log(`📝 Default Admin Credentials: username: admin, password: admin123`);
    console.log('⚠️  Change the default password immediately in production!\n');

  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
};

setupDatabase();