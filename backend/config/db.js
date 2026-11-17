const mysql = require('mysql2/promise');
require('dotenv').config();
const logger = require('../utils/logger');

// Create connection pool using environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'notes_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    logger.info('Database connected successfully to MySQL!');
    connection.release();
  } catch (error) {
    logger.error('Database connection failed: ' + error.message);
  }
}

testConnection();

module.exports = pool;