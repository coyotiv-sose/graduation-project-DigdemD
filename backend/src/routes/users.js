var express = require('express')
var router = express.Router()

const User = require('../models/user')
const Account = require('../models/account')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  res.send(await User.find())
})
//get single user(dynamic)
router.get('/user', async function (req, res, next) {
  const { userId } = req.body
  const user = User.findById(userId)

  res.send(await user)
})

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

//delete user --ok
router.delete('/:userId', async function (req, res, next) {
  const { userId } = req.params
  await User.findByIdAndDelete(userId)

  res.sendStatus(200)
})
//update user
router.put('/:userId', async function (req, res, next) {
  const { userId } = req.params
  const { newValues } = req.body
  let user = await User.findByIdAndUpdate(userId, newValues, { new: true })

  res.send(user)
})

module.exports = router
