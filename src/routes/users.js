var express = require('express')
const User = require('../user')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(`I can come here`)
  res.send(User.list)
})
//get single user(dynamic)
router.get('/:userName', function (req, res, next) {
  const { userName } = req.params
  const user = User.list.find(user => user.name === userName)

  res.send(user)
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
router.delete('/:userName', function (req, res, next) {
  const { userName } = req.params
  console.log(`users name is here${userName}`)
  const userIndex = User.list.findIndex(user => user.name === userName)
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
