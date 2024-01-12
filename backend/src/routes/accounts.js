const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Trade = require('../models/trade')
const Account = require('../models/account')

/* GET accounts listing. */
router.get('/', async function (req, res, next) {
  res.send(await Account.find())
})
//post (create) new Account --ok
router.post('/:userId', async function (req, res, next) {
  const { userId } = req.params
  const { currency } = req.body
  //const user = User.list.find(user => user.id === req.body.owner)
  const user = await User.findById(userId)

  const newAccount = await user.openAccount(currency, userId)

  res.status(200).send(newAccount)
})

//update account --ok
router.put('/:accountId', async function (req, res, next) {
  const { accountId } = req.params
  const { newValues } = req.body //= req.body.newValues
  let account = await Account.findById(accountId)

  Object.assign(account, newValues)
  res.send(account)
})
module.exports = router
