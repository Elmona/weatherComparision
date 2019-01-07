'use strict'

const mysql = require('mysql2')
require('dotenv').config()

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 50,
  queueLimit: 200
}).promise()

module.exports = connection