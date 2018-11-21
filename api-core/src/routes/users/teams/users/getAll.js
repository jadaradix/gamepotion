const errors = require('restify-errors')
const datalayer = require('../../../../abstractions/datalayer')
const classFactory = require('../../../../classes/factory-commonjs.js')

const route = (request, response, next) => {
  if (request.authorization.user.teamId === null) {
    response.send(new errors.NotFoundError('not part of a team'))
    return next(false)
  }
  datalayer.read('Users', {teamId: request.authorization.user.teamId}, 'descending:createdAt')
    .then(objects => {
      const apiObjects = objects.map(object => {
        const c = classFactory.user(object)
        return c.toApiList()
      })
      response.send(apiObjects)
      return next()
    })
    .catch(error => {
      console.error('[route users teams users getAll] datalayer.read caught', error)
      response.send(new errors.InternalServerError('sorry'))
      return next(false)
    })
}

module.exports = route
