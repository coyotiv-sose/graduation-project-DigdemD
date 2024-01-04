const axios = require('axios')

axios.defaults.baseURL = 'http://localhost:3000'

async function main() {
  //create new User
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

  const michael = await axios.post('/users', {
    name: 'Michael',
    surname: 'Schumacher',
    mobile: '6364893049',
    email: 'msc@gmail.com',
  })

  //delete user
  // await axios.delete('/users/2')
  // //update user
  // const updatedElisa = await axios.put('/users/1', { surname: 'Lam Edith', email: 'elisaupdated@gmail.com' })

  // //create new Account
  // const newAccount1 = await axios.post('/accounts', {
  //   currency: 'EUR',
  //   owner: elisa.data.id,
  // })

  // console.log(newAccount1.data.balance)
  // const newAccount2 = await axios.post('/accounts', {
  //   currency: 'JPY',
  //   owner: elisa.data.id,
  // })
  // const newAccount3 = await axios.post('/accounts', {
  //   currency: 'CAD',
  //   owner: elisa.data.id,
  // })
  // //update Account
  // const updatedAccount = await axios.put('/accounts/3', {
  //   newValues: {
  //     status: 'Passive',
  //     name: 'Hedge Account',
  //   },
  // })

  //create external Transfer

  // const newExternalTransfer = await axios.post('users/transfers', {
  //   userId: elisa.data.id,
  //   senderAccountId: null,
  //   receiverAccountId: 1,
  //   amount: 50000,
  // })

  //create new Trade
  // const newTrade1 = await axios.post('/trades', {
  //   currencyPair: 'EURUSD',
  //   buySellFlag: 'Buy',
  //   executionRate: '1.2',
  //   amount: 50,
  //   valueDate: '01.01.2023',
  //   buyAccountId: 2,
  //   sellAccountId: 1,
  //   userId: elisa.data.id,
  // })
  // console.log(newTrade1.data)

  // const newTrade2 = await axios.post('/trades', {
  //   currencyPair: 'EURUSD',
  //   buySellFlag: 'Sell',
  //   executionRate: '1.22',
  //   amount: 88800,
  //   valueDate: '01.01.2023',
  //   buyAccount: 1,
  //   sellAccount: 2,
  //   userId: elisa.data.id,
  // })
  //tradeList
  //const callTrades = await axios.get('/trades')

  //userList
  const callUsers = await axios.get('/users')
  console.log(callUsers.data)
  //accountList
  // const callAccounts = await axios.get('/users')
  // console.log(callAccounts.data)
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
//elisa.externalBalanceTransfer(10000, { from: null, to: 1 })
//elisa.externalBalanceTransfer(10000, { from: null, to: 2 })
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
