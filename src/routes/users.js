var express = require('express')
var router = express.Router()

const User = require('../models/user')

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
router.get('/:userName/accounts', async function (req, res, next) {
  const { userName, accounts } = req.params
  const user = await User.findOne({ name: req.params.userName })
  //res.send(user.accounts)
  res.send(user.accounts.map(account => ({ ...account, balance: account.balance })))
})
//get single user/trade(dynamic)
router.get('/:userName/trades', async function (req, res, next) {
  const { userName } = req.params
  const user = User.findOne({ name: req.params.userName })

  res.send(await user.trades)
})

//post new user
router.post('/', async function (req, res, next) {
  const newUser = await User.create({
    name: req.body.name,
    surname: req.body.surname,
    mobile: req.body.mobile,
    email: req.body.email,
  })

  res.status(200).send(newUser)
})
//post externalTransfer
router.post('/transfers', async function (req, res, next) {
  const { userId, senderAccountId, receiverAccountId, amount } = req.body

  const user = await User.findById(userId)
  let transfer = await user.externalBalanceTransfer(amount, {
    from: senderAccountId,
    to: receiverAccountId,
  })

  res.status(200).send(transfer)
})

// //delete user (soru)
// router.delete('/:userId', async function (req, res, next) {
//   const { userId } = req.params
//   const userIndex = User.findIndex(user => user.id == userId)
//   User.list.splice(userIndex, 1)

//   res.sendStatus(200)
// })
//update user
router.put('/:userId', async function (req, res, next) {
  const { userId } = req.params
  const { surname, email } = req.body
  const user = await User.findById(req.params.userId)
  user.surname = surname
  user.email = email

  res.send({ surname: user.surname, email: user.email })
})

module.exports = router
