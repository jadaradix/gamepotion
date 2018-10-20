const errors = require('restify-errors')
const datalayer = require('../../abstractions/datalayer')

const route = (request, response, next) => {
  datalayer.deleteOne('Users', request.authorization.user.id)
    .then(() => {
      response.header('content-type', 'text/plain')
      response.send(204)
    })
    .catch(() => {
      response.send(new errors.InternalServerError('didnt work'))
      return next(false)
    })
}

module.exports = route
