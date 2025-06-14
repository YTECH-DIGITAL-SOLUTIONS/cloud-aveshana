/** @format */

const { Pool } = require("pg");
require("dotenv").config(); // <= WAJIB untuk load .env

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // untuk koneksi publik Cloud SQL
  },
});

module.exports = pool;
