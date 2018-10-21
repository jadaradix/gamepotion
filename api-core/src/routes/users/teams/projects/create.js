const errors = require('restify-errors')
const datalayer = require('../../../../abstractions/datalayer')
const classes = require('../../../../classes/dist.js')

const route = (request, response, next) => {
  if (request.authorization.user.teamId === null) {
    response.send(new errors.NotFoundError('not part of a team'))
    return next(false)
  }
  let projectClass = new classes.Project()
  projectClass.teamId = request.authorization.user.teamId
  try {
    projectClass.fromApiPost(request.body)
  } catch (error) {
    response.send(new errors.BadRequestError(`this would not get created (${error.message})`))
    return next(false)
  }
  datalayer.write('Projects', projectClass.id, projectClass.toDatastore())
    .then(() => {
      response.send(projectClass.toApi())
      return next()
    })
    .catch(error => {
      console.error('[route users teams projects create] datalayer.write caught', error)
      response.send(new errors.InternalServerError('couldnt create project'))
      return next(false)
    })
}

module.exports = route
