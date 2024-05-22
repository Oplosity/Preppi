const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.user, // postgres by default
  password: process.env.password,
  host: process.env.host, // localhost by default
  port: process.env.port, // 5432 by default
  database: process.env.database // preppi_db by default
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};