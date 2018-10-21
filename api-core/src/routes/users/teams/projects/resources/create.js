const errors = require('restify-errors')
const datalayer = require('../../../../../abstractions/datalayer')
const classFactory = require('../../../../../classes/factory')

const findProject = (projectId, teamId) => {
  return datalayer.readOne(
    'Projects',
    {
      id: projectId,
      teamId
    }
  )
}

const route = async (request, response, next) => {
  let resourceClass
  try {
    await findProject(request.params.projectId, request.authorization.user.teamId)
    resourceClass = classFactory.resource({
      type: request.body.type
    })
    resourceClass.fromApiPost(request.body)
    resourceClass.projectId = request.params.projectId
  } catch (error) {
    response.send(new errors.BadRequestError(`this would not get created (${error.message})`))
    return next(false)
  }
  datalayer.write('Resources', resourceClass.id, resourceClass.toDatastore())
    .then(() => {
      response.send(201, resourceClass.toApi())
      return next()
    })
    .catch(error => {
      console.error('[route users teams projects resources create] datalayer.write caught', error)
      response.send(new errors.InternalServerError('couldnt create resource'))
      return next(false)
    })
}

module.exports = route
