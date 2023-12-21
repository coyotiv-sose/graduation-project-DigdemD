var express = require('express')
const User = require('../user')
var router = express.Router()
const list = []

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(list)
})

router.post('/', function (req, res, next) {
  const newUser = User.create({
    name: req.body.name,
    surname: req.body.surname,
    mobile: req.body.mobile,
    email: req.body.email,
  })

  list.push(newUser)

  res.status(200).send(newUser)
  // console.log(req.body.name)
  // console.log(User.list)
  //console.log(User.name[Heidi])
  // res.send(User.list.name[Heidi])
})
module.exports = router
