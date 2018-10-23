const errors = require('restify-errors')
const datalayer = require('../../../../abstractions/datalayer')
const classFactory = require('../../../../classes/factory')

const route = (request, response, next) => {
  datalayer.readOne('Projects', {id: request.params.id})
    .then(project => {
      const projectClass = classFactory.project(project)
      try {
        projectClass.fromApiPatch(request.body)
      } catch (error) {
        response.send(new errors.BadRequestError(`this would not get updated (${error.message})`))
        return next(false)
      }
      datalayer.write('Projects', projectClass.id, projectClass.toDatastore())
        .then(() => {
          response.send(projectClass.toApi())
          return next()
        })
        .catch(error => {
          console.error('[route users teams projects update] datalayer.write caught', error)
          response.send(new errors.InternalServerError('couldnt update project'))
          return next(false)
        })
    })
    .catch(error => {
      console.error('[route users teams projects update] datalayer.write caught', error)
      response.send(new errors.InternalServerError('couldnt update project'))
      return next(false)
    })
}

module.exports = route
