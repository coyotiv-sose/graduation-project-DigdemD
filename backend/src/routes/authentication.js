var express = require('express')
var router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')
//create new user (register)
router.post('/newUser', async function (req, res, next) {
  const { name, surname, email, mobile, password } = req.body
  const newUser = await User.register({ name, surname, email, mobile }, password)

  console.log('new user details' + newUser)
  res.send(newUser)
})

//login
router.post('/session', passport.authenticate('local', { failWithError: true }), function (req, res) {
  console.log('User is authenticated')
  res.send(req.user)
})

module.exports = router
