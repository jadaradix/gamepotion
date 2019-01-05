const errors = require('restify-errors')
const datalayer = require('../../../abstractions/datalayer')

const findTransaction = (transactionId, userId) => {
  return datalayer.readOne(
    'Transactions',
    {
      id: transactionId,
      userId
    }
  )
}

const route = async (request, response, next) => {
  try {
    await findTransaction(request.params.id, request.authorization.user.id)
  } catch (error) {
    response.send(new errors.NotFoundError('didnt work (1)'))
    return next(false)
  }
  datalayer.deleteOne('Transactions', request.params.id)
    .then(() => {
      response.header('content-type', 'text/plain')
      response.send(204)
    })
    .catch(() => {
      response.send(new errors.InternalServerError('didnt work (2)'))
      return next(false)
    })
}

module.exports = route
