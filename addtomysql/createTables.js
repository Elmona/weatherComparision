'use strict'

const createTables = connection => {
  const city = `
    CREATE TABLE IF NOT EXISTS city
    (
      name varchar(20),
      informationText text,
      INDEX(name),
      PRIMARY KEY (name)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `
  connection.query(city)
    .then(result => console.log(result))
    .catch(e => console.log(e))

  // temperature
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
      PRIMARY KEY (station)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `
  connection.query(tempStation)
    .then(result => console.log(result))
    .catch(e => console.log(e))

  // Rain
  const rainStation = `
    CREATE TABLE IF NOT EXISTS rainStation
    (
      city varchar(20),
      station varchar(20),
      INDEX(station, city),
      PRIMARY KEY (station)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `
  connection.query(rainStation)
    .then(result => console.log(result))
    .catch(e => console.log(e))

  const rainReport = `
    CREATE TABLE IF NOT EXISTS rainReports
    (
      timestamp DATE,
      station varchar(20),
      amount FLOAT,
      INDEX(timestamp, station, amount),
      PRIMARY KEY (timestamp, amount)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `
  connection.query(rainReport)
    .then(result => console.log(result))
    .catch(e => console.log(e))

}

module.exports = createTables