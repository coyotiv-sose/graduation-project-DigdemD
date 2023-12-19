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

  openAccount(currency) {
    const newAccount = new Account(currency, this.id)
    this.accounts.push(newAccount)
    return newAccount
  }
  executeTrade(buyAmount, sellAmount) {
    this.countOfTrade += 1
    this.tradeVolume += buyAmount
  }

  // internalBalanceTransfer(amount, { from, to }) {
  //   const senderAccountId = from
  //   const receiverAccountId = to
  //   senderAccountId.
  // }

  static create(name) {
    const user = new User(name)
    User.list.push(user)
  }
  static list = []
}

module.exports = User
