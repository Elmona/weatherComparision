'use strict'

const connection = require('./config/mysql')

const createTables = require('./createTables')
const fileConvertAndAdd = require('./fileConvertAndAdd')
const addToOtherTables = require('./addToOtherTables')

const data = [
  {
    filename: './data/smhi-opendata_1_66420_20190106_175008.csv',
    city: 'Kalmar',
    station: '66420',
    ranking: '10'
  },
  {
    filename: './data/smhi-opendata_1_66420_20190107_183930.csv',
    city: 'Kalmar',
    station: '66420',
    ranking: '10'
  },
  {
    filename: './data/smhi-opendata_1_66400_20190107_184122.csv',
    city: 'Kalmar',
    station: '66400',
    ranking: '10'
  },
  {
    filename: './data/smhi-opendata_1_66400_20190107_184111.csv',
    city: 'Kalmar',
    station: '66400',
    ranking: '10'
  },
  {
    filename: './data/smhi-opendata_1_64510_20190107_184759.csv',
    city: 'Växjö',
    station: '64510',
    ranking: '5'
  },
  {
    filename: './data/smhi-opendata_1_64510_20190107_184803.csv',
    city: 'Växjö',
    station: '64510',
    ranking: '5'
  },
  {
    filename: './data/smhi-opendata_1_64510_20190107_184803.csv',
    city: 'Skellefteå',
    station: '151380',
    ranking: '2'
  },
  {
    filename: './data/smhi-opendata_1_151380_20190107_185221.csv',
    city: 'Skellefteå',
    station: '151380',
    ranking: '2'
  },
]

// Creating tables
createTables(connection)

data.forEach(d => {
  // Adding data to other tables
  addToOtherTables(d, connection)

  // Adding data to other tables
  fileConvertAndAdd(d, connection)
})

// process.exit(1)