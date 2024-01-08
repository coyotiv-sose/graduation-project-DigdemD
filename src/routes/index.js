var express = require('express')
var router = express.Router()

const User = require('../models/user')
const Account = require('../models/account')
const Trade = require('../models/trade')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Gybing Fx Trading' })
})

router.get('/delete', async function (req, res, next) {
  await User.deleteMany({})
  await Account.deleteMany({})
  await Trade.deleteMany({})

  res.sendStatus(200)
})

module.exports = router
