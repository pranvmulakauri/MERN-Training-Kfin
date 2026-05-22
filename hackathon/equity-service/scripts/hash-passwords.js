/**
 * Run once after schema.sql to set bcrypt hashes for seed users.
 * Usage: node scripts/hash-passwords.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const bcrypt = require('bcryptjs');
const { pool } = require('../src/db');

const PASSWORD = 'password123';

async function main() {
  const hash = await bcrypt.hash(PASSWORD, 10);
  await pool.query('UPDATE equity_users SET password_hash = $1', [hash]);
  console.log('Updated password_hash for all equity users to:', PASSWORD);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
