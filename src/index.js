console.log("Hi coyote, let's have some JavaScript fun!")

class Customer {
  name
  surname
  email
  riskType

  constructor(name, surname, email) {
    this.name = name
    this.surname = surname
    this.email = email
    this.riskType = 'ScaredyCat'
  }

  get riskType() {
    return this.riskType
  }

  set riskType(type) {
    this.riskType = risk
  }
}

let veronica = new Customer('Veronica', 'Barredo', 'veronica@mexicana.com')
let alex = new Customer('Alex', 'Kimoto', 'alex@gmail.com')
