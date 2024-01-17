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
router.post('/:userId', async function (req, res, next) {
  //Id yi ucur body e koy
  const { userId } = req.params
  const { currencyPair, buySellFlag, executionRate, amount, valueDate, buyAccountId, sellAccountId } = req.body
  const user = await User.findById(userId)
  const sellAccount = await Account.findById(sellAccountId)
  const buyAccount = await Account.findById(buyAccountId)
  console.log(user)
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
