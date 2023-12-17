var express = require('express')
const User = require('../user')
var router = express.Router()

//const users = [{ name: 'Nesli' }, { name: 'Digdem' }]
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(User.list)
})
router.post('/', function (req, res, next) {
  const user = User.create(req.body.name)
  console.log(req.body.name)
  console.log(User.list)
  console.log(User.name[Heidi])
  res.send(User.list.name[Heidi])
})
module.exports = router
