const errors = require('restify-errors')
const datalayer = require('../../abstractions/datalayer')
const classFactory = require('../../classes/factory')

const route = (request, response, next) => {
  const updateUser = (userClass) => {
    try {
      userClass.fromApiPatch(request.body)
    } catch (error) {
      response.send(new errors.BadRequestError(`this would not get updated (${error.message})`))
      return next(false)
    }
    datalayer.write('Users', userClass.id, userClass.toDatastore())
      .then(() => {
        response.send(userClass.toApi())
        return next()
      })
      .catch(error => {
        console.error('[route users update] datalayer.write caught', error)
        response.send(new errors.InternalServerError('couldnt update user'))
        return next(false)
      })
  }
  datalayer.readOne('Users', {email: request.body.email})
    .then(user => {
      const userClass = classFactory.user(user)
      if (userClass.id !== request.authorization.user.id) {
        response.send(new errors.ForbiddenError('this email is already in use'))
        return next(false)
      }
      updateUser(userClass)
    })
    .catch(() => {
      updateUser(request.authorization.user)
    })
}

module.exports = route
