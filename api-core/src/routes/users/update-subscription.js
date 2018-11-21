const errors = require('restify-errors')
const datalayer = require('../../abstractions/datalayer')

const route = (request, response, next) => {
  try {
    request.authorization.user.updateSubscription(request.params.id)
  } catch (error) {
    response.send(new errors.BadRequestError(`this would not get updated (${error.message})`))
    return next(false)
  }
  datalayer.write('Users', request.authorization.user.id, request.authorization.user.toDatastore())
    .then(() => {
      response.send(request.authorization.user.toApi())
      return next()
    })
    .catch(error => {
      console.error('[route users update-subscription] datalayer.write caught', error)
      response.send(new errors.InternalServerError('couldnt update user'))
      return next(false)
    })
}

module.exports = route
