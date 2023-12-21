const User = require('./user.js')
const Account = require('./account.js')
//const { getMaxListeners } = require('json2csv/JSON2CSVTransform.js')

class Trade {
  static tradeIdCounter = 1
  constructor(tradeId, currencyPair, buySellFlag, executionRate, amount, valueDate, buyAccount, sellAccount) {
    this.tradeId = Trade.tradeIdCounter++
    this.currencyPair = currencyPair
    this.buySellFlag = buySellFlag
    this.executionRate = executionRate
    this.amount = amount
    this.valueDate = valueDate
    this.buyAccount = buyAccount
    this.sellAccount = sellAccount
    this.createdAt = new Date()
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

  static create({ tradeId, currencyPair, buySellFlag, executionRate, amount, valueDate, buyAccount, sellAccount }) {
    const newTrade = new Trade(
      tradeId,
      currencyPair,
      buySellFlag,
      executionRate,
      amount,
      valueDate,
      buyAccount,
      sellAccount
    )

    Trade.list.push(newTrade)

    return newTrade
  }

  static list = []
}

module.exports = Trade
