'use strict'

const connection = require('./config/mysql')

const createTables = require('./createTables')

const fileConvertAndAddTemperature = require('./temperature/fileConvertAndAdd')
const addToOtherTablesTemperature = require('./temperature/addToOtherTables')

const fileConvertAndAddRain = require('./rain/fileConvertAndAdd')
const addToOtherTablesRain = require('./rain/addToOtherTables')

const rainData = [
  {
    filename: './data/rain/smhi-opendata_5_64520_20190109_114307.csv',
    city: 'Växjö',
    station: '64520'
  },
  {
    filename: './data/rain/smhi-opendata_5_64520_20190109_114645.csv',
    city: 'Växjö',
    station: '64520'
  },
  {
    filename: './data/rain/smhi-opendata_5_66430_20190109_122508.csv',
    city: 'Kalmar',
    station: '66430'
  },
  {
    filename: './data/rain/smhi-opendata_5_66430_20190109_122511.csv',
    city: 'Kalmar',
    station: '66430'
  },
  {
    filename: './data/rain/smhi-opendata_5_150440_20190109_123028.csv',
    city: 'Skellefteå',
    station: '150440'
  },
  {
    filename: './data/rain/smhi-opendata_5_150440_20190109_123032.csv',
    city: 'Skellefteå',
    station: '150440'
  },
  {
    filename: './data/rain/smhi-opendata_5_83230_20190109_123735.csv',
    city: 'Skövde',
    station: '83230'
  },
  {
    filename: './data/rain/smhi-opendata_5_83230_20190109_123738.csv',
    city: 'Skövde',
    station: '83230'
  },
  {
    filename: './data/rain/smhi-opendata_5_74470_20190109_124121.csv',
    city: 'Jönköping',
    station: '74470'
  },
  {
    filename: './data/rain/smhi-opendata_5_74470_20190109_124124.csv',
    city: 'Jönköping',
    station: '74470'
  },
]

const temperatureData = [
  {
    filename: './data/temperature/smhi-opendata_1_66420_20190106_175008.csv',
    city: 'Kalmar',
    station: '66420',
  },
  {
    filename: './data/temperature/smhi-opendata_1_66420_20190107_183930.csv',
    city: 'Kalmar',
    station: '66420',
  },
  {
    filename: './data/temperature/smhi-opendata_1_66400_20190107_184122.csv',
    city: 'Kalmar',
    station: '66400',
  },
  {
    filename: './data/temperature/smhi-opendata_1_66400_20190107_184111.csv',
    city: 'Kalmar',
    station: '66400',
  },
  {
    filename: './data/temperature/smhi-opendata_1_64510_20190107_184759.csv',
    city: 'Växjö',
    station: '64510',
  },
  {
    filename: './data/temperature/smhi-opendata_1_64510_20190107_184803.csv',
    city: 'Växjö',
    station: '64510',
  },
  {
    filename: './data/temperature/smhi-opendata_1_64510_20190107_184803.csv',
    city: 'Skellefteå',
    station: '151380',
  },
  {
    filename: './data/temperature/smhi-opendata_1_151380_20190107_185221.csv',
    city: 'Skellefteå',
    station: '151380',
  },
  {
    filename: './data/temperature/smhi-opendata_1_74470_20190109_124424.csv',
    city: 'Jönköping',
    station: '74470',
  },
  {
    filename: './data/temperature/smhi-opendata_1_74460_20190109_124552.csv',
    city: 'Jönköping',
    station: '74460',
  },
  {
    filename: './data/temperature/smhi-opendata_1_74460_20190109_124555.csv',
    city: 'Jönköping',
    station: '74460',
  },
  {
    filename: './data/temperature/smhi-opendata_1_83230_20190109_124733.csv',
    city: 'Skövde',
    station: '83230',
  },
  {
    filename: './data/temperature/smhi-opendata_1_83230_20190109_124737.csv',
    city: 'Skövde',
    station: '83230',
  },
]

// Creating tables
createTables(connection)

temperatureData.forEach(data => {
  // Adding data to other tables
  addToOtherTablesTemperature(data, connection)

  // Adding data to other tables
  fileConvertAndAddTemperature(data, connection)
})

rainData.forEach(data => {
  // Adding data to other tables
  addToOtherTablesRain(data, connection)

  fileConvertAndAddRain(data, connection)
})