var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

require('dotenv').config()
require('./database-connection')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const tradesRouter = require('./routes/trades')
const accountsRouter = require('./routes/accounts')
var authenticationRouter = require('./routes/authentication.js')

const app = express()
const autopopulate = require('mongoose-autopopulate')

//communication to the frontend
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')

// requires the model with Passport-Local Mongoose plugged in
const User = require('./models/user')
const passport = require('passport')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(
  cors({
    origin: true, //by deployment fe url will be added
    credentials: true,
  })
)
app.use(
  session({
    secret: 'SuperSecureSecretNobodyKnows', // is required to enrcypt your session specifically to you like
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified
    saveUninitialized: true,
    cookie: {
      secure: process.env.ENVIRONMENT === 'production', // TODO: set to true when using https
      httpOnly: process.env.ENVIRONMENT === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // how long the cookie is valid in ms
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : '',
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_CONNECTION_STRING,
      stringify: false,
    }),
  })
)

passport.use(User.createStrategy())

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// intercept any http request to the backend
app.use((req, res, next) => {
  const numberOfVisits = req.session.numberOfVisits || 0
  req.session.numberOfVisits = numberOfVisits + 1
  req.session.blubb = 'blubb'
  req.session.history = req.session.history || []
  req.session.history.push(req.url)
  req.session.ip = req.ip
  req.session.userName = 'Hans'

  //console.log('Show me my request:', req.session)

  next()
})

app.use(passport.session())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/trades', tradesRouter)
app.use('/accounts', accountsRouter)
app.use('/authentication', authenticationRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
app.createSocketServer = function (server) {
  const io = require('socket.io')(server, {
    cors: {
      origin: true,
      credentials: true,
    },
  })

  console.log('Server side socket connection open')

  io.on('connection', socket => {
    console.log('a user connected')

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })

    setInterval(() => {
      socket.emit('time', new Date().toTimeString().slice(0, 8))
    }, 1000) //sends time data   every second to client side {1000 milisecond refers hier as 1 sec}
    setInterval(() => {
      socket.emit('eurusd', Math.random() + 1)
    }, 1000)
    setInterval(() => {
      socket.emit('eurusdsell', Math.random() + 1)
    }, 1000)

    setInterval(() => {
      socket.emit('gbpusd', Math.random() + 1)
    }, 1000)
    setInterval(() => {
      socket.emit('gbpusdsell', Math.random() + 1)
    }, 1000)
  })
}
console.log('i am alive! & blubb blubb')
module.exports = app
