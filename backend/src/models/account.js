const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const User = require('./user.js')

const accountSchema = new mongoose.Schema(
  {
    currency: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true },
    balance: { type: Number, default: 0, select: true },
    //#transactions: [],
    overdraft: { type: Number, default: 0, select: false },
    status: { type: String, default: 'Active' },
    name: String,
  },
  { timestamps: true }
)

class Account {
  // #setBalance = newAmount => {
  //   //if (newAmount < -this.#overdraft) throw new Error(`Balance can not go below -${this.#overdraft}`)
  //   this.balance = newAmount
  // }
  // get balance() {
  //   return this.balance
  // }

  async deposit(amount) {
    //if (amount <= 0) throw new Error(`Amount must be positive number`)
    //this.#transactions.push(amount)
    this.balance = this.balance + amount
    await this.save()
  }

  async withdraw(amount) {
    //if (amount <= 0) throw new Error(`Amount must be positive number`)
    //this.#transactions.push(amount)
    this.balance = this.balance - amount
    await this.save()
  }

  get transactions() {
    //return this.#transactions.slice()
  }
}

//module.exports = Account
accountSchema.loadClass(Account)
accountSchema.plugin(autopopulate)
module.exports = mongoose.model('Account', accountSchema)
