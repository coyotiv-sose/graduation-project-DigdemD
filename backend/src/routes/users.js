var express = require('express')
var router = express.Router()

const User = require('../models/user')
const Account = require('../models/account')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  res.send(await User.find())
})
//get single user(dynamic)
router.get('/:userName', async function (req, res, next) {
  const { userName } = req.params
  const user = User.findOne({ name: req.params.userName })

  res.send(await user)
})
//get single user/account(dynamic)
router.get('/accountsUs', async function (req, res, next) {
  console.log('we need sth')
  res.send(200)
})

// router.get('/accounts1', async function (req, res, next) {
//   console.log('sth we need log here ')
//   const user = await User.findOne({ email: req.session.passport?.user })
//   console.log('we would like to see our user ', user)
//   res.send(user.accounts)
// })

//get single user/trade(dynamic)
router.get('/:userId/trades', async function (req, res, next) {
  const { userId } = req.params
  const user = await User.findOne({ name: req.params.userId })

  res.send(await user.trades)
})

//post new user --ok
router.post('/', async function (req, res, next) {
  const newUser = await User.create({
    name: req.body.name,
    surname: req.body.surname,
    mobile: req.body.mobile,
    email: req.body.email,
  })

  res.status(200).send(newUser)
})
//post externalTransfer --ok
router.post(`/:userId/transfers`, async function (req, res, next) {
  const { userId } = req.params
  const { senderAccountId, receiverAccountId, amount } = req.body

  const user = await User.findById(userId)
  const senderAccount = await Account.findById(senderAccountId)
  const receiverAccount = await Account.findById(receiverAccountId)

  let transfer = await user.externalBalanceTransfer(amount, {
    from: senderAccount,
    to: receiverAccount,
  })
  console.log(`we would like to see transfer ${transfer}`)
  res.send({ transferredAmount: transfer })
})

//delete user --ok
router.delete('/:userId', async function (req, res, next) {
  const { userId } = req.params
  await User.findByIdAndDelete(userId)

  res.sendStatus(200)
})
//update user --ok
router.put('/:userId', async function (req, res, next) {
  const { userId } = req.params
  const { surname, email } = req.body
  const user = await User.findById(userId)
  user.surname = surname
  user.email = email

  res.send({ surname: user.surname, email: user.email })
})

module.exports = router
