'use strict'

// const csv = require('csv-parser')
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
  // console.log(`${data[0]} ${data[1]};${station};${data[2]};${data[3]}`)
})

lineReader.on('close', () => {
  const stream = fs.createWriteStream('../data/data/temp', {
    encoding: 'utf-8'
  })
  stream.once('open', fd => {
    results.forEach(data => {
      // let result = Object.keys(data)
      // console.log(result)
      // let timestamp = `${result[0]} ${result[1]}`
      // let temp = result[2]
      // let quality = result[3]
      // finished += `${timestamp};${station};${temp};${quality}\n`
      // console.log(`${timestamp};${station};${temp};${quality}\n`)
      // stream.write(`${timestamp};${station};${temp};${quality}\n`)
      stream.write(data)
    })
    console.log('Done')
    stream.end()
  })
})

// fs.writeFile('../data/data/temp', finished, 'utf8', function (err) {
//   if (err) console.log(err)
//   console.log('Finished writing file')
// })

// const query = `
//       LOAD DATA LOCAL INFILE '/var/lib/mysql/data/temp'
//       INTO TABLE temp
//       FIELDS TERMINATED BY ';'
//       LINES TERMINATED BY '\n'
//       (timestamp, station, temperature, quality);
//     `
// connection.query(query)
//   .then(data => {
//     console.log('Done!')
//     console.log(data)
//   })
//   .catch(e => console.log(e))

