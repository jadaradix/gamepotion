const bcrypt = require('bcrypt-nodejs')
const errors = require('restify-errors')
const datalayer = require('../../abstractions/datalayer')
const classFactory = require('../../classes/factory-commonjs.js')

const getPasswordHash = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, null, null, (error, passwordHash) => {
      if (error) {
        return reject(new Error('bcrypt errback'))
      } else {
        return resolve(passwordHash)
      }
    })
  })
}

const route = (request, response, next) => {
  const updateUser = async (userClass) => {
    try {
      userClass.fromApiPatch(request.body)
      if (typeof request.body.password === 'string') {
        userClass.passwordHash = await getPasswordHash(request.body.password)
      }
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
  datalayer.readOne('Users', {userlandId: request.body.userlandId})
    .then(user => {
      const userClass = classFactory.user(user)
      if (userClass.id !== request.authorization.user.id) {
        response.send(new errors.ForbiddenError('this userlandId (email) is already in use'))
        return next(false)
      }
      updateUser(userClass)
    })
    .catch(() => {
      updateUser(request.authorization.user)
    })
}

module.exports = route
