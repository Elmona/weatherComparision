const router = require('express').Router()

const mysql = require('../config/mysql')

const getTempData = (startDate, endDate, city) =>
  mysql.execute(
    `
  SELECT min(temperature) AS coldestDay,
        avg(temperature) AS avgTemp,
        max(temperature) AS warmestDay
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
        avg(amount) AS avgRain,
        max(amount) AS rainiestDay
  FROM rainReports
  INNER JOIN rainStation ON rainStation.city=?
  AND rainStation.station = rainReports.station
  WHERE rainReports.timestamp BETWEEN ? AND ?
`,
    [city, startDate, endDate]
  )

const getCityInformation = city =>
  mysql.execute(`SELECT informationText FROM city WHERE name=?`, [city])

const getSummary = (startDate, endDate) => city =>
  Promise.all([
    getTempData(startDate, endDate, city),
    getRainData(startDate, endDate, city),
    getCityInformation(city)
  ])
    .then(([temp, rain, info]) => ({
      ...temp[0][0],
      ...rain[0][0],
      ...info[0][0],
      city
    }))
    .catch(console.error)

const sendAsJSON = res => d => res.send(JSON.stringify(d))

router.route('/').post(({ body: { cities, startDate, endDate } }, res) => {
  Promise.all(cities.map(getSummary(startDate, endDate)))
    .then(sendAsJSON(res))
    .catch(e => sendAsJSON(res)({ message: 'No search results found' }))
})

module.exports = router
