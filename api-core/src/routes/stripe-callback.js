// const errors = require('restify-errors')
// const datalayer = require('../../abstractions/datalayer')

const route = (request, response, next) => {
  response.header('content-type', 'text/plain')
  response.send('stripe-callback ok!')
  return next()
  // request.authorization.user.addModule('pro', 'transactionId')
  // datalayer.write('Users', request.authorization.user.id, request.authorization.user.toDatastore())
  //   .then(() => {
  //     response.send(request.authorization.user.toApi())
  //     return next()
  //   })
  //   .catch(error => {
  //     console.error('[route stripe-callback] datalayer.write caught', error)
  //     response.send(new errors.InternalServerError('couldnt update user'))
  //     return next(false)
  //   })
}

module.exports = route
