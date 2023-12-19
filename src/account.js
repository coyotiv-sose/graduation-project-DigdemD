const User = require('./user.js')

class Account {
  #balance = 0
  #transactions = []
  #overdraft = 0
  status = 'Active'
  name = ''
  static accIdCounter = 1
  constructor(currency, owner) {
    this.accId = Account.accIdCounter++
    this.currency = currency
    this.owner = owner
  }
  #setBalance = newAmount => {
    //if (newAmount < -this.#overdraft) throw new Error(`Balance can not go below -${this.#overdraft}`)
    this.#balance = newAmount
  }
  get balance() {
    return this.#balance
  }

  deposit(amount) {
    //if (amount <= 0) throw new Error(`Amount must be positive number`)
    this.#transactions.push(amount)
    this.#setBalance(this.#balance + amount)
  }

  withdraw(amount) {
    //if (amount <= 0) throw new Error(`Amount must be positive number`)
    this.#transactions.push(amount)
    this.#setBalance(this.#balance - amount)
    this.#setBalance
  }

  get transactions() {
    return this.#transactions.slice()
  }
}

module.exports = Account
