const axios = require('axios')

async function main() {
  const john = await axios.post('http://localhost:3000/users', { name: 'John' })
  console.log(john.data)
  const callUsers = await axios.get('http://localhost:3000/users')
  console.log(callUsers.data)
}

main()
