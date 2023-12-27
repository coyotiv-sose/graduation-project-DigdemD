const express = require('express')
const User = require('../user')
const Trade = require('../trade')
const Account = require('../account')
const router = express.Router()

/* GET accounts listing. */
router.get('/', function (req, res, next) {
  res.send(Account.list)
})
//post (create) new Account
router.post('/', function (req, res, next) {
  const { currency, owner } = req.body
  const user = User.list.find(user => user.id === req.body.owner)

  const newAccount = user.openAccount(currency, owner)

  res.status(200).send(newAccount)
})

//update account
router.put('/:accountId', function (req, res, next) {
  //const { accId } = req.params
  const { newValues } = req.body //= req.body.newValues
  let account = Account.list.find(account => account.accId == req.params.accountId)

  Object.assign(account, newValues)
  res.send(account)
})
module.exports = router
