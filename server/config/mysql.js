'use strict'

const mysql = require('mysql2')
require('dotenv').config()

const connection = mysql.createConnection({
  host: 'weather-mysql',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 10000
}).promise().connect()

module.exports = connection