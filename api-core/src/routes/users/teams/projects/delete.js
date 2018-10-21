const errors = require('restify-errors')
const datalayer = require('../../../../abstractions/datalayer')

const route = async (request, response, next) => {
  const projectResources = await datalayer.read('Resources', { projectId: request.params.id })
  await Promise.all(projectResources.map(resource => {
    return datalayer.deleteOne('Resources', resource.id)
  }))
  datalayer.deleteOne('Projects', request.params.id)
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
