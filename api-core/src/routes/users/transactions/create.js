const assert = require('assert').strict
const errors = require('restify-errors')
const datalayer = require('../../../abstractions/datalayer')
const classes = require('../../../classes/dist.js')

const route = (request, response, next) => {
  let transactionClass
  const { moduleId } = request.body
  try {
    assert(typeof moduleId === 'string', 'moduleId is not a string')
    delete request.body.id
    delete request.body.userId
    delete request.body.createdAt
    transactionClass = new classes.Transaction({
      ...request.body,
      userId: request.authorization.user.id
    })
  } catch (error) {
    response.send(new errors.BadRequestError(`this would not get created (${error.message})`))
    return next(false)
  }
  datalayer.write('Transactions', transactionClass.id, transactionClass.toDatastore())
    .then(() => {
      response.send(201, transactionClass.toApi())
      return next()
    })
    .catch(error => {
      console.error('[route users transactions create] datalayer.write caught', error)
      response.send(new errors.InternalServerError('couldnt create'))
      return next(false)
    })
}

module.exports = route
