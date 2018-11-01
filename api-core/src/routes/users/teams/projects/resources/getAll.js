const errors = require('restify-errors')
const datalayer = require('../../../../../abstractions/datalayer')
const classFactory = require('../../../../../classes/factory-commonjs.js')

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
  try {
    await findProject(request.params.projectId, request.authorization.user.teamId)
  } catch (error) {
    response.send(new errors.NotFoundError('didnt work (1)'))
    return next(false)
  }
  datalayer.read('Resources', {projectId: request.params.projectId}, 'descending:createdAt')
    .then(objects => {
      const apiObjects = objects.map(object => {
        const c = classFactory.resource(object)
        return c.toApi()
      })
      response.send(apiObjects)
      return next()
    })
    .catch(error => {
      console.error('[route users teams projects resources getAll] datalayer.read caught', error)
      response.send(new errors.InternalServerError('sorry'))
      return next(false)
    })
}

module.exports = route
