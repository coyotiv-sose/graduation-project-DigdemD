class User {
  constructor(name) {
    this.name = name
  }
  static create(name) {
    const user = new User(name)
    User.list.push(user)
  }
  static list = []
}
module.exports = User
