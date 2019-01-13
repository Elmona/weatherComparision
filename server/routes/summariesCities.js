const router = require('express').Router()

const mysql = require('../config/mysql')

const getAverageTemperature = (startDate, endDate, city) =>
  mysql.execute(
    `
  SELECT avg(temperature) AS avgTemp
  FROM temperature
  INNER JOIN tempStation ON tempStation.city=?
  AND tempStation.station = temperature.station
  WHERE temperature.timestamp BETWEEN ? AND ?
`,
    [city, startDate, endDate]
  )

const getRainData = (startDate, endDate, city) =>
  mysql.execute(
    `
  SELECT sum(amount) AS totalRain,
         avg(amount) AS avgRain
  FROM rainReports
  INNER JOIN rainStation ON rainStation.city=?
  AND rainStation.station = rainReports.station
  WHERE rainReports.timestamp BETWEEN ? AND ?
`,
    [city, startDate, endDate]
  )

const getCityInformation = city =>
  mysql.execute(`SELECT informationText FROM city WHERE name=?`, [city])

const getColdestDay = (startDate, endDate, city) =>
  mysql.execute(
    `
    SELECT temperature,
           timestamp
    FROM   temperature
    WHERE  temperature = (SELECT Min(temperature) AS coldestDay
                      FROM   temperature
                              INNER JOIN tempStation
                                      ON tempStation.city = ?
                                        AND tempStation.station =
                                            temperature.station
                      WHERE  temperature.timestamp BETWEEN ? AND ?)
        AND temperature.timestamp BETWEEN ? AND ?
`,
    [city, startDate, endDate, startDate, endDate]
  )

const getWarmestDay = (startDate, endDate, city) =>
  mysql.execute(
    `
    SELECT temperature,
           timestamp
    FROM   temperature
    WHERE  temperature = (SELECT Max(temperature) AS warmestDay
                      FROM   temperature
                              INNER JOIN tempStation
                                      ON tempStation.city = ?
                                        AND tempStation.station =
                                            temperature.station
                      WHERE  temperature.timestamp BETWEEN ? AND ?)
        AND temperature.timestamp BETWEEN ? AND ?
`,
    [city, startDate, endDate, startDate, endDate]
  )

const getRainiestDay = (startDate, endDate, city) =>
  mysql.execute(
    `
    SELECT amount,
           timestamp
    FROM   rainReports
    WHERE  amount = (SELECT Max(amount) AS rainiestDay
                      FROM   rainReports
                              INNER JOIN rainStation
                                      ON rainStation.city = ?
                                        AND rainStation.station =
                                        rainReports.station
                      WHERE  rainReports.timestamp BETWEEN ? AND ?)
        AND rainReports.timestamp BETWEEN ? AND ?
`,
    [city, startDate, endDate, startDate, endDate]
  )

const getSummary = (startDate, endDate) => city =>
  console.log(startDate, endDate) ||
  Promise.all([
    getAverageTemperature(startDate, endDate, city),
    getRainData(startDate, endDate, city),
    getColdestDay(startDate, endDate, city),
    getWarmestDay(startDate, endDate, city),
    getRainiestDay(startDate, endDate, city),
    getCityInformation(city)
  ])
    .then(([avgTemp, rain, coldest, warmest, rainiest, info]) => ({
      ...avgTemp[0][0],
      ...rain[0][0],
      ...info[0][0],
      coldestDay: { ...coldest[0][0] },
      warmestDay: { ...warmest[0][0] },
      rainiestDay: { ...rainiest[0][0] },
      city
    }))
    .catch(console.error)

const sendAsJSON = res => d => console.log(d) || res.send(JSON.stringify(d))

router.route('/').post(({ body: { cities, startDate, endDate } }, res) => {
  Promise.all(cities.map(getSummary(startDate, endDate)))
    .then(sendAsJSON(res))
    .catch(e => sendAsJSON(res)({ message: 'No search results found' }))
})

module.exports = router
