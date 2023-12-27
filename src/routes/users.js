var express = require('express')
const User = require('../user')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(User.list)
})
//get single user(dynamic)
router.get('/:userName', function (req, res, next) {
  const { userName } = req.params
  const user = User.list.find(user => user.name === userName)

  res.send(user)
})
//get single user/account(dynamic)
router.get('/:userName/:accounts', function (req, res, next) {
  const { userName, accounts } = req.params
  const user = User.list.find(user => user.name === userName)

  res.send(user.accounts)
})

//post new user
router.post('/', function (req, res, next) {
  const newUser = User.create({
    name: req.body.name,
    surname: req.body.surname,
    mobile: req.body.mobile,
    email: req.body.email,
  })

  res.status(200).send(newUser)
})

//delete user
router.delete('/:userId', function (req, res, next) {
  const { userId } = req.params
  const userIndex = User.list.findIndex(user => user.id == userId)
  User.list.splice(userIndex, 1)

  res.sendStatus(200)
})
//update user
router.put('/:userName', function (req, res, next) {
  const { userName } = req.params
  const { surname, email } = req.body
  const user = User.list.find(user => user.name === userName)
  user.surname = surname
  user.email = email

  res.send({ surname: user.surname, email: user.email })
})

module.exports = router
