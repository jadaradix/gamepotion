const errors = require('restify-errors')
const datalayer = require('../abstractions/datalayer')
const classFactory = require('../classes/factory-commonjs.js')

const getProject = async (id) => {
  const object = await datalayer.readOne('Projects', { id })
  return classFactory.project(object).toApiPublic()
}

const getResources = async (id) => {
  const objects = await datalayer.read('Resources', {projectId: id})
  return objects.map(object => {
    const c = classFactory.resource(object)
    return c.toApi()
  })
}

const route = async (request, response, next) => {
  const { id } = request.params
  try {
    const project = await getProject(id)
    const resources = await getResources(id)
    response.send({
      project,
      resources
    })
    return next()
  } catch (error) {
    console.error('[route play-project] datalayer.readOne caught', error)
    response.send(new errors.NotFoundError('this doesnt exist'))
    return next(false)
  }
}

module.exports = route
