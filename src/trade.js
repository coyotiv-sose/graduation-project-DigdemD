const User = require('./user.js')
const Account = require('./account.js')

class Trade {
  static tradeIdCounter = 1
  constructor(
    tradeId,
    // user,??
    currencyPair,
    buySellFlag,
    executionRate,
    amount,
    valueDate,
    buyAccount,
    sellAccount,
    tradeTime
  ) {
    this.tradeId = Account.tradeIdCounter++
    this.currencyPair = currencyPair
    this.buySellFlag = buySellFlag
    this.executionRate = executionRate
    this.amount = amount
    this.valueDate = valueDate
    this.buyAccount = buyAccount
    this.sellAccount = sellAccount
    this.tradeTime = tradeTime
  }
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

module.exports = Trade
