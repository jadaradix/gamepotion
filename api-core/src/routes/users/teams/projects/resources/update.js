const errors = require('restify-errors')
const datalayer = require('../../../../../abstractions/datalayer')
const classFactory = require('../../../../../classes/factory-commonjs.js')

const findResource = (resourceId, projectId) => {
  return datalayer.readOne(
    'Resources',
    {
      id: resourceId,
      projectId
    }
  )
}

const route = async (request, response, next) => {
  let resourceClass
  try {
    const resource = await findResource(request.params.resourceId, request.params.projectId)
    resourceClass = classFactory.resource(resource)
    resourceClass.fromApiPatch(request.body)
  } catch (error) {
    response.send(new errors.NotFoundError('didnt work (1)'))
    return next(false)
  }
  datalayer.write('Resources', resourceClass.id, resourceClass.toDatastore())
    .then(() => {
      response.send(resourceClass.toApi())
      return next()
    })
    .catch(error => {
      console.error('[route users teams projects resources update] datalayer.write caught', error)
      response.send(new errors.InternalServerError('couldnt update resource'))
      return next(false)
    })
}

module.exports = route
