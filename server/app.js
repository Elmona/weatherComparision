const express = require('express')
const mysql = require('./config/mysql')

const app = express()
const port = 3001

app.get('/test', (req, res) => {
  console.log('it wööörks')
  res.send({ text: 'It wööörks' })
})

app.listen(port, () => console.log(`Server running at port ${port}`))