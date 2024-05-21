const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PG_USER, // postgres by default
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST, // localhost by default
  port: process.env.PG_PORT, // 5432 by default
  database: process.env.PG_DATABASE // preppi_db by default
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};