const errors = require('restify-errors')
const datalayer = require('../../../../../abstractions/datalayer')
const storage = require('../../../../../abstractions/storage')
const inspectImage = require('../../../../../abstractions/inspect-image')
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

const storeResourceBin = (resourceClass, resourceRule, file) => {
  const fileName = `${resourceClass.id}.${resourceRule.EXTENSION}`
  return storage.file(file.path, fileName, resourceRule.MIMETYPE)
}

const writeResource = (resourceClass) => {
  return datalayer.write('Resources', resourceClass.id, resourceClass.toDatastore())
}

const RESOURCES_RULES = {
  'image': {
    SUPPORTED_MIME_TYPES: [
      'image/png',
    ],
    SUPPORTED_EXTENSIONS: [
      'png'
    ],
    MIMETYPE: 'image/png',
    EXTENSION: 'png'
  },
  'sound': {
    SUPPORTED_MIME_TYPES: [
      'audio/wav'
    ],
    SUPPORTED_EXTENSIONS: [
      'wav'
    ],
    MIMETYPE: 'audio/wav',
    EXTENSION: 'wav'
  }
}

const route = async (request, response, next) => {
  if (request.files === undefined || typeof request.files.bin !== 'object') {
    response.send(new errors.BadRequestError('no bin file key'))
    return next(false)
  }
  let resource
  try {
    resource = await findResource(request.params.resourceId, request.params.projectId)
  } catch (error) {
    response.send(new errors.NotFoundError())
    return next(false)
  }
  const resourceClass = classFactory.resource(resource)
  const resourceRule = RESOURCES_RULES[resourceClass.type]
  if (resourceRule === undefined) {
    response.send(new errors.BadRequestError('you cant update the bin of this resource type'))
    return next(false)
  }
  const file = request.files.bin
  if (!resourceRule.SUPPORTED_MIME_TYPES.includes(file.type)) {
    response.send(new errors.BadRequestError(`mime type not supported (one of ${resourceRule.SUPPORTED_MIME_TYPES.join(' / ')})`))
    return next(false)
  }
  const foundValidExtension = resourceRule.SUPPORTED_EXTENSIONS.find(e => {
    return (file.name.indexOf(e) === file.name.length - e.length)
  })
  if (foundValidExtension === undefined) {
    response.send(new errors.BadRequestError(`extension not supported (one of ${resourceRule.SUPPORTED_EXTENSIONS.join(' / ')})`))
    return next(false)
  }

  resourceClass.fixed = null
  if (resourceClass.type === 'image') {
    const {
      width
    } = await inspectImage(file.path)
    resourceClass.frameWidth = width
    resourceClass.frameHeight = width
  }

  Promise.all([
    storeResourceBin(resourceClass, resourceRule, file),
    writeResource(resourceClass)
  ])
    .then(() => {
      response.send(resourceClass.toApi())
      return next()
    })
    .catch(error => {
      console.error('[route users teams projects resources update] datalayer.write caught', error)
      response.send(new errors.InternalServerError('couldnt update resource bin'))
      return next(false)
    })
}

module.exports = route
