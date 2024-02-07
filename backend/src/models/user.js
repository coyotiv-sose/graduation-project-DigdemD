const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose')
//const { Parser } = require('json2csv')
const fs = require('fs') //filesystem module in node.js

const Account = require('./account.js')
const Trade = require('./trade.js')

const userSchema = new mongoose.Schema(
  {
    name: String,
    surname: String,
    email: String, //will be coming from passportLocalMongoose
    mobile: String,
    accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account', autopopulate: true }],
    trades: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trade' }],
    RiskGroup: { type: String, default: 'Starter' },
    dateOfBirth: String,
    currencyPairs: [String],
    minTradeLimit: { type: Number, default: 1000 },
    maxTradeLimit: { type: Number, default: 1000000 },
    clickAndTrade: Boolean,
    countOfTrade: { type: Number, default: 0 },
    tradeVolume: { type: Number, default: 0 },
  },
  { timestamps: true }
)

class User {
  async openAccount(currency) {
    let isDefault = false

    const accountsList = await Account.find({ owner: this._id }).lean().exec()
    const accountsCurrency = accountsList.map(accounts => accounts.currency)
    accountsCurrency.includes(currency) ? (isDefault = false) : (isDefault = true)

    const newAccount = await Account.create({ currency: currency, owner: this.id, isDefault: isDefault })
    this.accounts.push(newAccount)
    await newAccount.save()
    await this.save()
    return newAccount
  }

  async executeTrade(currencyPair, buySellFlag, executionRate, amount, valueDate, buyAccount, sellAccount) {
    const buyCurrency =
      buySellFlag === 'buy' ? currencyPair.slice(0, 3).toUpperCase() : currencyPair.slice(3, 6).toUpperCase()
    const sellCurrency =
      buySellFlag === 'buy' ? currencyPair.slice(3, 6).toUpperCase() : currencyPair.slice(0, 3).toUpperCase()

    let buyAmount = buySellFlag === 'Buy' ? amount : amount * executionRate
    let sellAmount = buySellFlag === 'Buy' ? amount * executionRate : amount

    if (buyAccount.currency !== buyCurrency || sellAccount.currency !== sellCurrency) {
      throw new Error(
        'Currency mismatch between buy and sell accounts. Ensure that the selected accounts match the currency pair'
      )
    }

    if (sellAccount.balance < sellAmount) {
      throw new Error(`Balance is not available`)
    }

    const newTrade = await Trade.create({
      currencyPair,
      buySellFlag,
      executionRate,
      amount,
      valueDate,
      buyAccount,
      sellAccount,
    })
    this.countOfTrade += 1
    this.tradeVolume += amount
    this.trades.push(newTrade)
    await buyAccount.deposit(buyAmount)
    await sellAccount.withdraw(sellAmount)
    await this.save()

    return newTrade
  }

  //need to talk about logic refactor edilecek
  updateSettings(dateOfBirth, currencyPairs, minTradeLimit, maxTradeLimit, clickAndTrade) {
    if (dateOfBirth !== null) {
      this.dateOfBirth = dateOfBirth
    }
    if (currencyPairs !== null) {
      this.currencyPairs = currencyPairs
    }
    if (minTradeLimit !== null) {
      this.minTradeLimit = minTradeLimit
    }
    if (maxTradeLimit !== null) {
      this.maxTradeLimit = maxTradeLimit
    }
    if (clickAndTrade !== null) {
      this.clickAndTrade = clickAndTrade
    }
  }
  exportFile() {
    const tradeHistory = this.trades.map(trade => {
      return {
        tradeId: trade.tradeId,
        currencyPair: trade.currencyPair,
        buySellFlag: trade.buySellFlag,
        executionRate: trade.executionRate,
        amount: trade.amount,
        valueDate: trade.valueDate,
        buyAccount: trade.buyAccount,
        sellAccount: trade.sellAccount,
        tradeTime: trade.tradeTime,
      }
    })
    //creating a new instance of the Parser object from the json2csv library.
    const json2csvParser = new Parser()
    //calling the parse method on our json2csvParser object and passing in our tradeHistory data.
    //The parse method takes  JSON data and converts it into a CSV string.
    const csv = json2csvParser.parse(tradeHistory)

    fs.writeFile(`${this.name}_trade_history.csv`, csv, err => {
      if (err) throw err
      console.log('Trade history has been saved!')
    })
  }
}

//module.exports = User
userSchema.loadClass(User)
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
userSchema.plugin(autopopulate)
module.exports = mongoose.model('User', userSchema)
