const Account = require('./account.js')

class UserFx {
  static idCounter = 1
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
  userId = UserFx.idCounter++

  openAccount(accountCurrency) {
    const newAccount = new Account(accountCurrency)
    return newAccount
  }
  executeTrade(buyAmount, sellAmount) {
    this.countOfTrade += 1
    this.tradeVolume += buyAmount
  }
}

const max = new UserFx({ name: 'Max', surname: 'Michael', email: 'max@gmail.com', mobile: 1235555 })
const elisa = new UserFx({ name: 'Elisa', surname: 'Lam', email: 'elisa@gmail.com', mobile: 144555 })

max.currencyPairs = ['USDTRY', 'EURUSD']
max.executeTrade(1000)
elisa.executeTrade(1500)
elisa.executeTrade(2000)
max.openAccount('USD')
console.log(max)
console.log(elisa)

module.exports = UserFx
