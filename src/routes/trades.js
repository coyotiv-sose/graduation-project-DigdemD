const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Trade = require('../models/trade')
const Account = require('../models/account')

/* GET trades listing. */
router.get('/', async function (req, res, next) {
  res.send(await Trade.find())
})
//post new Trade
router.post('/', async function (req, res, next) {
  const { currencyPair, buySellFlag, executionRate, amount, valueDate, buyAccountId, sellAccountId, userId } = req.body
  const user = User.findById(req.body.userId)
  const sellAccount = Account.findById(req.body.sellAccountId)
  const buyAccount = Account.list.findById(req.body.buyAccountId)

  const newTrade = await user.executeTrade(
    currencyPair,
    buySellFlag,
    executionRate,
    amount,
    valueDate,
    buyAccount,
    sellAccount
  )

  res.status(200).send(newTrade)
})

module.exports = router
