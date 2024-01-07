const mongoose = require('mongoose')

const User = require('./user.js')

const accountSchema = new mongoose.Schema({
  currency: String,
  owner: String,
  balance: { type: Number, default: 0, select: false },
  //#transactions: [],
  overdraft: { type: Number, default: 0, select: false },
  status: { type: String, default: 'Active' },
  name: String,
})

class Account {
  #setBalance = newAmount => {
    //if (newAmount < -this.#overdraft) throw new Error(`Balance can not go below -${this.#overdraft}`)
    this.balance = newAmount
  }
  get balance() {
    return this.balance
  }

  async deposit(amount) {
    //if (amount <= 0) throw new Error(`Amount must be positive number`)
    //this.#transactions.push(amount)
    await this.setBalance(this.balance + amount)
  }

  async withdraw(amount) {
    //if (amount <= 0) throw new Error(`Amount must be positive number`)
    //this.#transactions.push(amount)
    await this.setBalance(this.balance - amount)
  }

  get transactions() {
    //return this.#transactions.slice()
  }
}

//module.exports = Account
module.exports = mongoose.model('Account', accountSchema)
