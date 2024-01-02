const Account = require('./account.js')
const Trade = require('./trade.js')
const { Parser } = require('json2csv')
const fs = require('fs') //filesystem module in node.js

class User {
  static idCounter = 1
  accounts = []
  trades = []
  constructor(name, surname, email, mobile) {
    this.name = name
    this.surname = surname
    this.email = email
    this.mobile = mobile
  }
  RiskGroup = 'starter'
  dateOfBirth = ''
  currencyPairs = []
  minTradeLimit = 1000 //USD
  maxTradeLimit = 1000000 //USD
  clickAndTrade = true
  countOfTrade = 0
  tradeVolume = 0 //USD
  id = User.idCounter++

  openAccount(currency) {
    const newAccount = Account.create({ currency: currency, owner: this.id })
    this.accounts.push(newAccount)
    return newAccount
  }
  deleteAccount(accId) {
    for (let i = 0; i < this.accounts.length; i++) {
      if (this.accounts[i].accId === accId) {
        this.accounts[i].status = 'Passive'
      }
    }
  }
  executeTrade(currencyPair, buySellFlag, executionRate, amount, valueDate, buyAccount, sellAccount, tradeTime) {
    if (sellAccount.balance() >= amount) {
      const newTrade = Trade.create({
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

      return newTrade
    } else {
      throw new Error(`Balance is not available`)
    }
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
  externalBalanceTransfer(amount, { from, to }) {
    const senderAccountId = from
    const receiverAccountId = to
    if (senderAccountId === null) {
      for (let i = 0; i < this.accounts.length; i++) {
        if (this.accounts[i].accId === receiverAccountId) {
          this.accounts[i].deposit(amount)
        }
      }
    } else if (receiverAccountId === null) {
      for (let j = 0; j < this.accounts.length; j++) {
        if (this.accounts[j] === senderAccountId) {
          this.accounts[j].withdraw(amount)
        }
      }
    }
  } //need to talk about logic
  updateSettings(dateOfBirth, currencyPairs, minTradeLimit, maxTradeLimit, clickAndTrade) {
    if (dateOfBirth !== null) {
      this.dateOfBirth = dateOfBirth
      console.log('dateOfBirth after update:', this.dateOfBirth)
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

  static create({ name, surname, mobile, email }) {
    const newUser = new User(name, surname, email, mobile)

    User.list.push(newUser)

    return newUser
  }

  static list = []
}

module.exports = User
