const express = require('express')
const bodyparser = require('body-parser')
const app = express()

const port = 3001

app.use(bodyparser.json())

app.use('/get', require('./routes/get'))

app.listen(port, () => console.log(`Server running at port ${port}`))