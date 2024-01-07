const mongoose = require('mongoose')

const User = require('./user.js')
const Account = require('./account.js')

const tradeSchema = new mongoose.Schema({
  currencyPair: String,
  buySellFlag: String,
  executionRate: Number,
  amount: Number,
  valueDate: String,
  buyAccount: Number,
  sellAccount: Number,
  createdAt: String,
})
class Trade {
  get buyCurrency() {
    return this.currencyPair.slice(0, 3)
  }
  get sellCurrency() {
    return this.currencyPair.slice(3, 6)
  }

  //to check if trade could be done(account availability)
  //return success/fail message
  //if succeed => assign trade id,
  //if succeed => update account balance
  //if succeed => insert trade history
  //if not succeed => return error message
  //if not succeed => insert trade history
}

module.exports = mongoose.model('Trade', tradeSchema)
