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

const countResouresOfThisType = (projectId, type) => {
  return datalayer.read(
    'Resources',
    {
      projectId,
      type
    }
  ).then(resources => resources.length)
}

const MAX_RESOURCES_BEFORE_PURCHASE_PRO = 5

const route = async (request, response, next) => {
  let resourceClass
  try {
    await findProject(request.params.projectId, request.authorization.user.teamId)
    resourceClass = classFactory.resource({
      type: request.body.type
    })
    const resourcesOfThisType = await countResouresOfThisType(request.params.projectId, resourceClass.type)
    if (resourcesOfThisType >= MAX_RESOURCES_BEFORE_PURCHASE_PRO) {
      response.send(new errors.BadRequestError(`you need to buy Pro in the Store to add more than ${MAX_RESOURCES_BEFORE_PURCHASE_PRO} ${resourceClass.type}s`))
      return next(false)
    }
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
