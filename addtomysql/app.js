const pool = require('./config/mysql')

pool.query('select * from test')
  .then(data => console.log(data))
  .catch(e => console.log(e))