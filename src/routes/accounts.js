const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Trade = require('../models/trade')
const Account = require('../models/account')

/* GET accounts listing. */
router.get('/', async function (req, res, next) {
  res.send(await Account.find())
})
//post (create) new Account
router.post('/', async function (req, res, next) {
  const { currency, owner } = req.body
  //const user = User.list.find(user => user.id === req.body.owner)
  const user = await User.findById(req.body.owner)

  const newAccount = await user.openAccount(currency, owner)

  res.status(200).send(newAccount)
})

//update account
router.put('/:accountId', async function (req, res, next) {
  //const { accId } = req.params
  const { newValues } = req.body //= req.body.newValues
  let account = await Account.findById(req.params.accountId)

  Object.assign(account, newValues)
  res.send(account)
})
module.exports = router
