const classes = require('./dist.js')

module.exports = {
  user: (user) => {
    const c = new classes.User(user)
    return c
  }
}
