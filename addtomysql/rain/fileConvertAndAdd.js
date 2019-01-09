'use strict'

const fs = require('fs')
const readline = require('readline')

const results = []
let lineNumber = 0

const fileConvertAndAdd = (data, connection) => {
  const station = data.station

  const lineReader = readline.createInterface({
    input: fs.createReadStream(data.filename)
  })

  lineReader.on('line', line => {
    if (lineNumber > 11) {
      let data = line.split(';')
      results.push(`${data[2]};${station};${data[3]}\n`)
    } else {
      lineNumber++
    }
  })

  lineReader.on('close', () => {
    const stream = fs.createWriteStream('./temp', {
      encoding: 'utf-8'
    })

    stream.once('open', fd => {
      results.forEach(data => {
        stream.write(data)
        // console.log(data)
      })
      console.log('Done')
      console.log('Adding to db')
      stream.end()
      const query = `
          LOAD DATA LOCAL INFILE './temp'
          INTO TABLE rainReports
          FIELDS TERMINATED BY ';'
          LINES TERMINATED BY '\n'
          (timestamp, station, amount);
        `
      connection.query(query)
        .then(data => {
          console.log('Added to database')
          console.log('All finished!')
          console.log(data)

          // process.exit()
        })
        .catch(e => console.log(e))
    })
  })
}

module.exports = fileConvertAndAdd
