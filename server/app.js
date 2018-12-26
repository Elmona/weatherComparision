const express = require('express')
const mysql = require('./config/mysql')

const app = express()
const port = 3001

app.get('/', (req, res) => {
  console.log(mysql)
  res.send('Hello world!')
})

app.listen(port, () => console.log(`Server running at port ${port}`))