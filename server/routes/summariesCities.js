const router = require('express').Router()

router.route('/').post(({ body }, res) => {
  console.log('post summary', body)
  res.send(JSON.stringify({ message: 'success' }))
})

module.exports = router
