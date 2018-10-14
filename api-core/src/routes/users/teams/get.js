const errors = require('restify-errors')
const wiener = require('../../../abstractions/datalayer')
const classFactory = require('../../../classes/factory')

const route = (request, response, next) => {
  wiener.readOne('Teams', {id: request.authorization.user.teamId})
    .then(async object => {
      const c = classFactory.team(object)
      response.send(c.toApi())
      return next()
    })
    .catch((error) => {
      console.error('[route users teams get] datalayer.readOne caught', error)
      response.send(new errors.NotFoundError('this team doesnt exist'))
      return next(false)
    })
}

module.exports = route
