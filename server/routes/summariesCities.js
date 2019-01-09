const router = require('express').Router()

const mysql = require('../config/mysql')

const getTempData = (startDate, endDate) => city =>
  mysql.execute(`
SELECT min(temperature) AS min,
       avg(temperature) AS avg,
       max(temperature) AS max
FROM temperature
INNER JOIN tempStation ON tempStation.city='${city}'
AND tempStation.station = temperature.station
WHERE temperature.timestamp BETWEEN '${startDate} 00:00:00' AND '${endDate} 00:00:00'
`)

router.route('/').post(({ body }, res) => {
  Promise.all(body.cities.map(getTempData(body.startDate, body.endDate)))
    .then(citiesTemps => citiesTemps.map(([rows, _]) => rows))
    .then(temps => {
      console.log(temps)
      res.send(JSON.stringify(temps))
    })
})

module.exports = router
