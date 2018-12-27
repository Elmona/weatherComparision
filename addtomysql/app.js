'use strict'

const csv = require('csv-parser')
const fs = require('fs')
const pool = require('./config/mysql')

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
// pool.query(table)
//   .then(result => console.log(result))
//   .catch(e => console.log(e))

fs
  .createReadStream('../data/data/smhi-opendata_1_66420_20181227_105819.fixed.csv')
  .pipe(csv({
    separator: ';',
    header: true,
  }))
  .on('data', data => {
    results.push(data)
  })
  .on('end', async () => {
    let finished = ''
    console.log('Finished reading data, adding to database')
    results.forEach(data => {
      const result = Object.keys(data)
      const timestamp = `${result[0]} ${result[1]}`
      const temp = result[2]
      const quality = result[3]
      finished += `${timestamp};${station};${temp};${quality}\n`
    })

    fs.writeFile('../data/data/temp', finished, 'utf8', function (err) {
      if (err) console.log(err)
      console.log('Finished writing file')
    })

    const query = `
      LOAD DATA LOCAL INFILE '/var/lib/mysql/data/temp'
      INTO TABLE temp
      FIELDS TERMINATED BY ';'
      LINES TERMINATED BY '\n'
      (timestamp, station, temperature, quality);
    `
    pool.query(query)
      .promise()
      .then(data => {
        console.log('Done!')
        console.log(data)
      })
      .catch(e => console.log(e))
  })

