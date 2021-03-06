'use strict'

const addToOtherTables = (data, connection) => {
  connection.execute(
    'INSERT INTO city (name) VALUES (?)',
    [data.city])
    .then(result => console.log(result))
    .catch(e => console.log(e))

  connection.execute(
    'INSERT INTO tempStation (city, station) VALUES (?, ?)',
    [data.city, data.station])
    .then(result => console.log(result))
    .catch(e => console.log(e))
}

module.exports = addToOtherTables
