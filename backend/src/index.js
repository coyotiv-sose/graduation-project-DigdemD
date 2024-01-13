const axios = require('axios')
const User = require('./models/user.js')
axios.defaults.baseURL = 'http://localhost:3000'

async function main() {
  await axios.delete('/db')
  console.log('all records are deleted')

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

  const marie = await axios.post('/users', {
    name: 'Marie',
    surname: 'Curie',
    mobile: '6364893088',
    email: 'chemi@gmail.com',
  })

  //delete user
  await axios.delete(`/users/${marie.data._id}`)

  //update user
  const updatedElisa = await axios.put(`/users/${elisa.data._id} `, {
    surname: 'Lam Edith',
    email: 'elisaupdated@gmail.com',
  })

  //create new Account
  const newAccount1 = await axios.post(`/accounts`, {
    ownerId: elisa.data._id,
    currency: 'USD',
  })

  const newAccount2 = await axios.post(`/accounts`, {
    ownerId: elisa.data._id,
    currency: 'EUR',
  })

  const newAccount3 = await axios.post(`/accounts`, {
    ownerId: elisa.data._id,
    currency: 'CAD',
  })

  //update Account
  const updatedAccount = await axios.put(`/accounts/${newAccount3.data._id}`, {
    newValues: {
      status: 'Passive',
      name: 'Hedge Account',
    },
  })

  //create external Transfer

  const newExternalTransfer = await axios.post(`/users/${elisa.data._id}/transfers`, {
    senderAccountId: null,
    receiverAccountId: newAccount1.data._id,
    amount: 50000,
  })

  const newExternalTransfer2 = await axios.post(`/users/${elisa.data._id}/transfers`, {
    senderAccountId: null,
    receiverAccountId: newAccount2.data._id,
    amount: 50000,
  })

  //create new Trade
  const newTrade1 = await axios.post('/trades', {
    currencyPair: 'EURUSD',
    buySellFlag: 'Buy',
    executionRate: '2',
    amount: 3000,
    valueDate: '01.05.2023',
    buyAccountId: newAccount2.data._id,
    sellAccountId: newAccount1.data._id,
    userId: elisa.data._id,
  })

  //create new Trade (sell)
  const newTrade2 = await axios.post('/trades', {
    currencyPair: 'EURUSD',
    buySellFlag: 'Sell',
    executionRate: '2',
    amount: 400,
    valueDate: '01.05.2023',
    buyAccountId: newAccount2.data._id,
    sellAccountId: newAccount1.data._id,
    userId: elisa.data._id,
  })

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
  const callTrades = await axios.get('/trades')

  //userList
  const callUsers = await axios.get('/users')

  //accountList
  // const callAccounts = await axios.get('/users')
  // console.log(callAccounts.data)
}

main()