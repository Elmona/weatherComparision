'use strict'

const fs = require('fs')
const readline = require('readline')
const connection = require('./config/mysql')

const results = []
const station = 'Kalmar flygplats'

const table = `
  CREATE TABLE IF NOT EXISTS temp
  (
    timestamp TIMESTAMP PRIMARY KEY,
    station varchar(20),
    temperature FLOAT,
    quality VARCHAR(1),
    INDEX(timestamp, station, temperature)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`
connection.query(table)
  .then(result => console.log(result))
  .catch(e => console.log(e))

const lineReader = readline.createInterface({
  input: fs.createReadStream('../data/data/smhi-opendata_1_66420_20181227_105819.fixed.csv')
})

lineReader.on('line', line => {
  let data = line.split(';')
  results.push(`${data[0]} ${data[1]};${station};${data[2]};${data[3]}\n`)
})

lineReader.on('close', () => {
  const stream = fs.createWriteStream('./temp', {
    encoding: 'utf-8'
  })
  stream.once('open', fd => {
    results.forEach(data => {
      stream.write(data)
    })
    console.log('Done')
    console.log('Adding to db')
    stream.end()
    const query = `
          LOAD DATA LOCAL INFILE './temp'
          INTO TABLE temp
          FIELDS TERMINATED BY ';'
          LINES TERMINATED BY '\n'
          (timestamp, station, temperature, quality);
        `
    connection.query(query)
      .then(data => {
        console.log('Added to database')
        console.log(data)
        process.exit()
      })
      .catch(e => console.log(e))
  })
})


