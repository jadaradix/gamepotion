const assert = require('assert').strict
const errors = require('restify-errors')
const datalayer = require('../abstractions/datalayer')
const classes = require('../classes/dist.js')

const getTransaction = async (id) => {
  const object = await datalayer.readOne('Transactions', { id })
  return new classes.Transaction(object)
}

const updateTransaction = async (transaction, delta) => {
  transaction.fromApiPatch(delta)
  return datalayer.write('Transactions', transaction.id, transaction.toDatastore())
}

const addModule = async (userId, transactionId, moduleId) => {
  const userObject = await datalayer.readOne('Users', { id: userId })
  const user = new classes.User(userObject)
  user.addModule(moduleId, transactionId)
  return datalayer.write('Users', user.id, user.toDatastore())
}

const route = async (request, response, next) => {
  const { id } = request.body
  try {
    assert(typeof id === 'string', 'id is not a string')
    const transaction = await getTransaction(id)
    await updateTransaction(
      transaction,
      {
        state: 'PAID'
      }
    )
    await addModule(transaction.userId, transaction.id, transaction.moduleId)
    response.header('content-type', 'text/plain')
    response.send(`stripe-callback:${transaction.state}`)
    return next()
  } catch (error) {
    console.error('[route stripe-callback] getTransaction etc caught', error)
    response.send(new errors.BadRequestError(`couldnt update transaction; ${error.message}`))
    return next(false)
  }
}

module.exports = route
