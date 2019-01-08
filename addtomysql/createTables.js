'use strict'

const createTables = connection => {
  const temperature = `
    CREATE TABLE IF NOT EXISTS temperature
    (
      timestamp TIMESTAMP,
      station varchar(20),
      temperature FLOAT,
      INDEX(timestamp, station, temperature),
      PRIMARY KEY (timestamp, station)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `
  connection.query(temperature)
    .then(result => console.log(result))
    .catch(e => console.log(e))

  const tempStation = `
    CREATE TABLE IF NOT EXISTS tempStation
    (
      city varchar(20),
      station varchar(20),
      INDEX(station, city),
      PRIMARY KEY (station, city)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `
  connection.query(tempStation)
    .then(result => console.log(result))
    .catch(e => console.log(e))

  const city = `
    CREATE TABLE IF NOT EXISTS city
    (
      name varchar(20),
      ranking int,
      INDEX(name),
      PRIMARY KEY (name)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `
  connection.query(city)
    .then(result => console.log(result))
    .catch(e => console.log(e))

}

module.exports = createTables