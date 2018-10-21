const classes = require('../classes/dist.js')
const actions = Object.values(classes.actions).map(actionClass => {
  const action = new actionClass()
  return action.toApi()
})

const route = (request, response, next) => {
  response.send(actions)
  return next()
}

module.exports = route
