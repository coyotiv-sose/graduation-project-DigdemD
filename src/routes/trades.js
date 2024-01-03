const express = require('express')
const User = require('../user')
const Trade = require('../trade')
const router = express.Router()
const Account = require('../account')

/* GET trades listing. */
router.get('/', function (req, res, next) {
  res.send(Trade.list)
})
//post new Trade
router.post('/', function (req, res, next) {
  const { currencyPair, buySellFlag, executionRate, amount, valueDate, buyAccountId, sellAccountId, userId } = req.body
  const user = User.list.find(user => user.id === userId)
  const sellAccount = Account.list.find(account => account.accId === sellAccountId)
  const buyAccount = Account.list.find(account => account.accId === buyAccountId)
  console.log('buraya gelebiyorum')
  const newTrade = user.executeTrade(
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
