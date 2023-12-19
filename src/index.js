const axios = require('axios')
const User = require('./user.js')
const Account = require('./account.js')

async function main() {
  // const heidi = await axios.post('http://localhost:3000/users', { name: 'Heidi' })
  // console.log(heidi.data)

  const callUsers = await axios.get('http://localhost:3000/users')
  console.log(callUsers.data)
}

//main()

const max = new User({ name: 'Max', surname: 'Michael', email: 'max@gmail.com', mobile: 1235555 })
const elisa = new User({ name: 'Elisa', surname: 'Lam', email: 'elisa@gmail.com', mobile: 144555 })

max.currencyPairs = ['USDTRY', 'EURUSD']
max.executeTrade(1000)
elisa.executeTrade(1500)
elisa.executeTrade(2000)
const maxAccount = max.openAccount('USD')
//console.log(maxAccount)
max.openAccount('EUR', 1)
//console.log(max.accounts)
