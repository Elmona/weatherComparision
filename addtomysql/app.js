'use strict'

const connection = require('./config/mysql')

const createTables = require('./createTables')
const fileConvertAndAdd = require('./fileConvertAndAdd')
const addToOtherTables = require('./addToOtherTables')

const data = {
  filename: './data/smhi-opendata_1_66420_20190106_175008.csv',
  city: 'Kalmar',
  station: '66420',
  ranking: '10'
}

// Creating tables
createTables(connection)

// Adding data to other tables
addToOtherTables(data, connection)

// Adding data to other tables
fileConvertAndAdd(data, connection)

const x = `
select
  min(temperature) as min,
  avg(temperature) as avg,
  max(temperature) as max 
from temperature
inner join tempStation
  on tempStation.city='Kalmar'
where 
  temperature.timestamp
    between '2019-01-01 00:00:00'
    and '2019-12-29 00:00:00'
`
