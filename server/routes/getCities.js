
'use strict'

const getCities = require('express').Router()
const mysql = require('../config/mysql')

const query = `
select name from city;
`

getCities.route('/')
  .get((req, res) => {
    console.log('Getting cities')

    mysql.execute(query)
      .then(([rows, fields]) => {
        console.log(rows)
        res.send(JSON.stringify(rows))
      })
  })

module.exports = getCities