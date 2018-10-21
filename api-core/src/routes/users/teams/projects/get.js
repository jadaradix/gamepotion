const errors = require('restify-errors')
const datalayer = require('../../../../abstractions/datalayer')
const classFactory = require('../../../../classes/factory')

const route = (request, response, next) => {
  if (request.authorization.user.teamId === null) {
    response.send(new errors.NotFoundError('not part of a team'))
    return next(false)
  }
  datalayer.readOne('Projects', {id: request.params.id, teamId: request.authorization.user.teamId})
    .then(async object => {
      const c = classFactory.project(object)
      response.send(c.toApi())
      return next()
    })
    .catch((error) => {
      console.error('[route users teams projects get] datalayer.readOne caught', error)
      response.send(new errors.NotFoundError('this doesnt exist or it doesnt belong to you'))
      return next(false)
    })
}

module.exports = route
