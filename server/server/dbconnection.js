const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER, // postgres by default
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST, // localhost by default
  port: process.env.DB_PORT, // 5432 by default
  database: process.env.DB_DATABASE // preppi_db by default
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};