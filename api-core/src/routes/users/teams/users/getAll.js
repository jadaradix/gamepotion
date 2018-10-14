const errors = require('restify-errors')
const wiener = require('../../../../abstractions/datalayer')
const classFactory = require('../../../../classes/factory')

const route = (request, response, next) => {
  wiener.read('Users', {teamId: request.authorization.user.teamId}, 'descending:createdAt')
    .then(objects => {
      const apiObjects = objects.map(object => {
        const c = classFactory.user(object)
        return c.toApiUsersList()
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
