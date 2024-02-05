const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Account = require('../models/account')

/* GET accounts listing. */
router.get('/', async function (req, res, next) {
  res.send(await Account.find())
})
//all accounts of user
router.get('/all', async function (req, res, next) {
  console.log(req.session)
  const user = await User.findOne({ email: req.session.passport.user })
  res.send(user.accounts)
})
//post (create) new Account --ok
router.post('/', async function (req, res, next) {
  const { currency } = req.body

  const user = await User.findOne({ email: req.session.passport.user })

  const newAccount = await user.openAccount(currency)

  res.status(200).send(newAccount)
})

//update account --old
router.put('/:accountId', async function (req, res, next) {
  const { accountId } = req.params
  const { newValues } = req.body //= req.body.newValues
  let account = await Account.findByIdAndUpdate(accountId, newValues, { new: true })

  //Object.assign(account, newValues)
  res.send(account)
})

//post externalTransfer --ok
router.post(`/transfers`, async function (req, res, next) {
  const { senderAccountId, receiverAccountIBAN, amount } = req.body

  const senderAccount = await Account.findById(senderAccountId)
  // const receiverAccount = await Account.findById(receiverAccountId)
  console.log('------sender account----', senderAccount)
  let transfer = await senderAccount.externalBalanceTransfer(amount, receiverAccountIBAN)
  console.log(`we would like to see transfer ${transfer}`)
  res.send({ transferredAmount: transfer })
})

module.exports = router
