const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // Change this to your postgresql username
  password: 'admin', // Change this to your postgresql password
  host: 'localhost',
  port: 5432, // Change this to the port your postgresql server listens on
  database: 'preppi_db' // Change this to the name of your database
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};