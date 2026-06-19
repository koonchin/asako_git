const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Credentials can be overridden via CLI args or env vars:
//   node scripts/create_admin.js <username> <password> [email]
// Defaults match the requested admin account.
const username = process.argv[2] || process.env.ADMIN_USERNAME || 'adminmain1';
const password = process.argv[3] || process.env.ADMIN_PASSWORD || 'asakothai2026';
const email =
  process.argv[4] || process.env.ADMIN_EMAIL || `${username}@asako.local`;

const createAdmin = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
  });

  try {
    console.log(`🔧 Creating admin user '${username}'...`);

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new admin, or update the password/email if the username exists.
    await connection.query(
      `INSERT INTO users (username, password, email, role)
       VALUES (?, ?, ?, 'admin')
       ON DUPLICATE KEY UPDATE password = VALUES(password), email = VALUES(email), role = 'admin'`,
      [username, hashedPassword, email]
    );

    console.log('✅ Admin user ready.');
    console.log(`   username: ${username}`);
    console.log(`   email:    ${email}`);
    console.log('   role:     admin');
    console.log('\n🎉 Done. You can now log in with these credentials.');
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
};

createAdmin();
