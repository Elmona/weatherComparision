'use strict'

const get = require('express').Router()
const mysql = require('../config/mysql')

const query = `
select
  min(temperature) as min,
  avg(temperature) as avg,
  max(temperature) as max 
from temperature
inner join tempStation
  on tempStation.city='Skellefteå'
  and tempStation.station = temperature.station
where 
  temperature.timestamp
    between '2010-01-01 00:00:00'
    and '2019-12-29 00:00:00'
`

get.route('/')
  .get((req, res) => {
    console.log('Get')

    mysql.execute(query)
      .then(([rows, fields]) => {
        console.log(rows)
        res.send(JSON.stringify(rows))
      })
  })

module.exports = get