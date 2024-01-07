const axios = require('axios')
const User = require('./models/user.js')
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

  //create new Account
  const newAccount1 = await axios.post('/accounts', {
    currency: 'EUR',
    owner: '659ad789222403faf4191ae5',
  })

  const newAccount2 = await axios.post('/accounts', {
    currency: 'JPY',
    owner: '659ad789222403faf4191ae5',
  })

  const newAccount3 = await axios.post('/accounts', {
    currency: 'CAD',
    owner: '659ad789222403faf4191ae5',
  })

  // //update Account
  // const updatedAccount = await axios.put('/accounts/3', {
  //   newValues: {
  //     status: 'Passive',
  //     name: 'Hedge Account',
  //   },
  // })

  //create external Transfer

  const newExternalTransfer = await axios.post('users/transfers', {
    userId: '659ad789222403faf4191ae5',
    senderAccountId: null,
    receiverAccountId: '659ae09ab3b9e6b038e9bd08',
    amount: 50000,
  })

  // //create new Trade
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
  //console.log(newTrade1.data)

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
