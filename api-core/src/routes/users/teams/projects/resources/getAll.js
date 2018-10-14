const errors = require('restify-errors')
const wiener = require('../../../../../abstractions/datalayer')
const classFactory = require('../../../../../classes/factory')

const route = (request, response, next) => {
  wiener.read('Resources', {projectId: request.params.id}, 'descending:createdAt')
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
