const platforms = require('../platforms/index.js').map(p => p.toApi())

const route = (request, response, next) => {
  response.send(platforms)
  return next()
}

module.exports = route
