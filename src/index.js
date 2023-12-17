const axios = require('axios')

async function main() {
  // const heidi = await axios.post('http://localhost:3000/users', { name: 'Heidi' })
  // console.log(heidi.data)

  const callUsers = await axios.get('http://localhost:3000/users')
  console.log(callUsers.data)
}

main()
