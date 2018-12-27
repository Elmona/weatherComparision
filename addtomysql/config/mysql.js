'use strict'

const mysql = require('mysql2')
require('dotenv').config({ path: '../.env' })

const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 500000,
  queueLimit: 10000
}).promise()

module.exports = pool