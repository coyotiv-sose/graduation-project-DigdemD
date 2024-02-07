const mongoose = require('mongoose')

const User = require('./user.js')
const Account = require('./account.js')

const tradeSchema = new mongoose.Schema(
  {
    currencyPair: String,
    buySellFlag: String,
    executionRate: Number,
    amount: Number,
    valueDate: String,
    buyAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    sellAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  },
  { timestamps: true }
)

class Trade {
  get buyCurrency() {
    return this.currencyPair.slice(0, 3)
  }
  get sellCurrency() {
    return this.currencyPair.slice(3, 6)
  }
}

module.exports = mongoose.model('Trade', tradeSchema)
