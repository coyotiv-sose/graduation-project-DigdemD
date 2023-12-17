const UserFx = require('./userFx.js')

class Account {
  #balance = 0
  #transactions = []
  #overdraft = 0
  static accIdCounter = 1
  constructor(accountCurrency) {
    this.accountId = Account.accIdCounter++
    this.accountCurrency = accountCurrency
  }
  #setBalance = newAmount => {
    if (newAmount < -this.#overdraft) throw new Error(`Balance can not go below -${this.#overdraft}`)
    this.#balance = newAmount
  }

  get balance() {
    return this.#balance
  }

  deposit(amount) {
    if (amount <= 0) throw new Error(`Amount must be positive number`)
    this.#transactions.push(amount)
    this.#setBalance(this.#balance + amount)
  }

  withdraw(amount) {
    if (amount <= 0) throw new Error(`Amount must be positive number`)
    this.#transactions.push(amount)
    this.#setBalance(this.#balance - amount)
    this.#setBalance
  }

  get transactions() {
    return this.#transactions.slice()
  }
}

const account = new Account('USD')
//account.deposit(200)
//account.deposit(100)
//account.deposit(2000)

console.log('account balance', account.balance)
console.log('transaction history', account.transactions)
console.log(account)

module.exports = Account
