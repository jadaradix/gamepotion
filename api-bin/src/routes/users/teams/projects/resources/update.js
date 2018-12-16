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

const storeResourceBin = (resourceClass, file, mimetype, extension) => {
  const fileName = `${resourceClass.id}.${extension}`
  return storage.file(file.path, fileName, mimetype)
}

const writeResource = (resourceClass) => {
  return datalayer.write('Resources', resourceClass.id, resourceClass.toDatastore())
}

const RESOURCE_RULES = [
  ['image', 'image/png', 'png'],
  ['image', 'image/gif', 'gif'],
  ['image', 'image/bmp', 'bmp'],
  ['sound', 'audio/wav', 'wav'],
  ['sound', 'audio/mpeg', 'mp3'],
  ['sound', 'audio/mp3', 'mp3']
]

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
  const file = request.files.bin
  const resourceRule = RESOURCE_RULES.find(([type, mimeType, extension]) => {
    return (
      resourceClass.type === type &&
      file.type === mimeType &&
      file.name.endsWith(`.${extension}`)
    )
  })
  if (resourceRule === undefined) {
    response.send(new errors.BadRequestError('you cant update the bin of this resource with a file of that type'))
    return next(false)
  }

  resourceClass.fixed = null
  const [
    // eslint-disable-next-line no-unused-vars
    sType,
    sMimetype,
    sExtension
  ] = resourceRule
  resourceClass.extension = sExtension
  if (resourceClass.type === 'image') {
    const {
      width,
      height
    } = await inspectImage(file.path)
    resourceClass.frameWidth = width
    resourceClass.frameHeight = width
    resourceClass.frameCount = parseInt(Math.ceil(height / width), 10)
  }

  Promise.all([
    storeResourceBin(resourceClass, file, sMimetype, sExtension),
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
