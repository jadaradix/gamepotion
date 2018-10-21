const errors = require('restify-errors')
const datalayer = require('../../../abstractions/datalayer')
const classFactory = require('../../../classes/factory')

const route = (request, response, next) => {
  datalayer.readOne('Teams', {id: request.authorization.user.teamId})
    .then(team => {
      const teamClass = classFactory.team(team)
      teamClass.fromApiPatch(request.body)
      datalayer.write('Teams', teamClass.id, teamClass.toDatastore())
        .then(() => {
          response.send(teamClass.toApi())
          return next()
        })
        .catch(error => {
          console.error('[route users teams update] datalayer.write caught', error)
          response.send(new errors.InternalServerError('couldnt update team'))
          return next(false)
        })
    })
    .catch(error => {
      console.error('[route users teams update] datalayer.write caught', error)
      response.send(new errors.InternalServerError('couldnt update team'))
      return next(false)
    })
}

module.exports = route
