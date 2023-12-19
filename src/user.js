const Account = require('./account.js')

class User {
  static idCounter = 1
  accounts = []
  constructor(name, surname, email, mobile) {
    this.name = name
    this.surname = surname
    this.email = email
    this.mobile = mobile
  }
  RiskGroup = 'starter'
  mobile = ''
  dateOfBirth = ''
  currencyPairs = []
  minTradeLimit = 1000 //USD
  maxTradeLimit = 1000000 //USD
  clickAndTrade = true
  countOfTrade = 0
  tradeVolume = 0 //USD
  id = User.idCounter++

  openAccount(currency, accId) {
    const newAccount = new Account(currency, this.id)
    this.accounts.push(newAccount)
    return newAccount
  }

  executeTrade(buyAmount, sellAmount) {
    this.countOfTrade += 1
    this.tradeVolume += buyAmount
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
  updateSettings() {}

  static create(name) {
    const user = new User(name)
    User.list.push(user)
  }
  static list = []
}

module.exports = User
