const axios = require('axios')
const User = require('./user.js')
const Account = require('./account.js')
const Trade = require('./trade.js')
const { response } = require('express')

axios.defaults.baseURL = 'http://localhost:3000'

async function main() {
  const elisa = await axios.post('/users', {
    name: 'Elisa',
    surname: 'Lam',
    mobile: '215376',
    email: 'elisa@gmail.com',
  })

  const max = await axios.post('/users', {
    name: 'Max',
    surname: 'Michael',
    mobile: '5555',
    email: 'max@gmail.com',
  })

  const callUsers = await axios.get('/users')
  console.log(callUsers.data)

  // const allUsers = await axios.get('/users')
  // console.log('allUsers: ', allUsers.data)
}

main()

//const max = new User('Max', 'Michael', 'max@gmail.com', 1235555)
//const elisa = new User('Elisa', 'Lam', 'elisa@gmail.com', 144555)

// max.currencyPairs = ['USDTRY', 'EURUSD']
// max.executeTrade(1000)
// elisa.executeTrade(1500)
// elisa.executeTrade(2000)
// const maxAccount = max.openAccount('USD')
// //console.log(maxAccount)
// max.openAccount('EUR', 1)
// console.log(max.accounts)
// max.externalBalanceTransfer(10000, { from: null, to: 1 })
// max.externalBalanceTransfer(50000, { from: null, to: 2 })
// max.internalBalanceTransfer(1000, { from: 1, to: 2 })

// max.accounts.forEach(account => {
//   console.log(account, account.balance)
// })
// elisa.openAccount('CHF')
// elisa.openAccount('CHF')
// elisa.deleteAccount('CHF', 4)
// //console.log(elisa.accounts)
// //elisa.openAccount('CHF', 4)//?
// console.log(max)

// console.log(`------`)
// //console.log(max)
// //max.updateSettings('1.1.1999', ['USDTRY', 'EURUSD', 'CADTRY'], 2000, null, null)
// //console.log(max)
// /*trade Class and executeTrade Testing
// max.executeTrade(null, 'EURUSD', 'buy', 1.2, 1000, '2023-12-31', 1, 2, '2022-01-01')
// const tradelistOfMax = max.trades
// console.log(tradelistOfMax)*/
// //open account test
// max.openAccount('JPY')
// console.log(max)
// max.deleteAccount(2)
// console.log(max)
