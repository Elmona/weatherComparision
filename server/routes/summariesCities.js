const router = require('express').Router()

const mysql = require('../config/mysql')

const getTempData = (startDate, endDate, city) =>
  mysql.execute(`
SELECT min(temperature) AS min,
       avg(temperature) AS avg,
       max(temperature) AS max
FROM temperature
INNER JOIN tempStation ON tempStation.city='${city}'
AND tempStation.station = temperature.station
WHERE temperature.timestamp BETWEEN '${startDate} 00:00:00' AND '${endDate} 00:00:00'
`)

const getRainData = (startDate, endDate, city) =>
  mysql.execute(`
SELECT min(amount) AS leastRain,
     avg(amount) AS avgRain,
     max(amount) AS mostRain
FROM rainReports
INNER JOIN rainStation ON rainStation.city='${city}'
AND rainStation.station = rainReports.station
`)

const getSummary = (startDate, endDate) => city =>
  Promise.all([
    getTempData(startDate, endDate, city),
    getRainData(startDate, endDate, city)
  ])
    .then(([temp, rain]) => ({
      ...temp[0][0],
      ...rain[0][0],
      city
    }))
    .catch(console.error)

router.route('/').post(({ body }, res) => {
  Promise.all(body.cities.map(getSummary(body.startDate, body.endDate)))
    // .then(citiesTemps => citiesTemps.map(([rows, _]) => rows))

    .then(temps => {
      console.log(temps)
      res.send(JSON.stringify(temps))
    })
})

module.exports = router
