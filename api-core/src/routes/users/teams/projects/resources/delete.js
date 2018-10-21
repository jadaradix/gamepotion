const errors = require('restify-errors')
const datalayer = require('../../../../../abstractions/datalayer')

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
  try {
    await findResource(request.params.resourceId, request.params.projectId)
  } catch (error) {
    response.send(new errors.NotFoundError('didnt work (1)'))
    return next(false)
  }
  datalayer.deleteOne('Resources', request.params.resourceId)
    .then(() => {
      response.header('content-type', 'text/plain')
      response.send(204)
    })
    .catch(() => {
      response.send(new errors.InternalServerError('didnt work (2)'))
      return next(false)
    })
}

module.exports = route
