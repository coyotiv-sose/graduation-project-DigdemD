const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
//const { Parser } = require('json2csv')
const fs = require('fs') //filesystem module in node.js

const Account = require('./account.js')
const Trade = require('./trade.js')

const userSchema = new mongoose.Schema(
  {
    name: String,
    surname: String,
    email: String,
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
    const newAccount = await Account.create({ currency: currency, owner: this.id })

    this.accounts.push(newAccount)
    await newAccount.save()
    await this.save()
    return newAccount
  }
  deleteAccount(accId) {
    for (let i = 0; i < this.accounts.length; i++) {
      if (this.accounts[i].accId === accId) {
        this.accounts[i].status = 'Passive'
      }
    }
  }
  async executeTrade(currencyPair, buySellFlag, executionRate, amount, valueDate, buyAccountId, sellAccountId) {
    const buyCurrency = buySellFlag === 'Buy' ? currencyPair.slice(0, 3) : currencyPair.slice(3, 6)
    const sellCurrency = buySellFlag === 'Buy' ? currencyPair.slice(3, 6) : currencyPair.slice(0, 3)
    const buyAccount = await Account.findById(buyAccountId)
    const sellAccount = await Account.findById(sellAccountId)

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

  internalBalanceTransfer(amount, { from, to }) {
    const senderAccountId = from
    const receiverAccountId = to
    //balance transfer withdraw leg
    for (let i = 0; i < this.accounts.length; i++) {
      if (this.accounts[i].accId === senderAccountId) {
        this.accounts[i].withdraw(amount)
      }
    }
    //balance transfer deposit leg
    for (let j = 0; j < this.accounts.length; j++) {
      if (this.accounts[j].accId === receiverAccountId) {
        this.accounts[j].deposit(amount)
      }
    }
  }
  async externalBalanceTransfer(amount, { from, to }) {
    const senderAccount = from
    const receiverAccount = to

    if (!senderAccount) {
      //const receiverAccount = this.accounts.find(account => account._id === receiverAccountId)
      return await receiverAccount.deposit(amount)
    } else if (!receiverAccount) {
      //  const senderAccount = this.accounts.find(account => account._id === senderAccountId)
      return await senderAccount.deposit(amount)
    }
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
userSchema.plugin(autopopulate)
module.exports = mongoose.model('User', userSchema)
