const errors = require('restify-errors')
const datalayer = require('../../../abstractions/datalayer')
const classFactory = require('../../../classes/factory-commonjs.js')

const route = async (request, response, next) => {
  if (request.authorization.user.teamId === null) {
    response.send(new errors.NotFoundError('not part of a team'))
    return next(false)
  }
  const teamUsers = await datalayer.read('Users', { teamId: request.authorization.user.teamId })
  await Promise.all(teamUsers.map(user => {
    const userClass = classFactory.user(user)
    userClass.teamId = null
    return datalayer.write('Users', userClass.id, userClass.toDatastore())
  }))
  const teamProjects = await datalayer.read('Projects', { teamId: request.authorization.user.teamId })
  await Promise.all(teamProjects.map(project => {
    return datalayer.deleteOne('Projects', project.id)
  }))
  datalayer.deleteOne('Teams', request.authorization.user.teamId)
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
