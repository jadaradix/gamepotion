const bcrypt = require('bcrypt-nodejs')
const errors = require('restify-errors')
const datalayer = require('../../abstractions/datalayer')
const classes = require('../../classes/dist.js')

const getExistingUser = (email) => {
  return datalayer.readOne('Users', { email })
}

const getExistingTeam = (id) => {
  return datalayer.readOne('Teams', { id })
}

const getPasswordHash = (password, callback) => {
  return bcrypt.hash(password, null, null, callback)
}

const route = (request, response, next) => {
  if (typeof request.body.password !== 'string' || request.body.password.length < 6 || request.body.password.length > 128) {
    response.send(new errors.BadRequestError('password does not conform'))
    return next(false)
  }
  let userClass
  try {
    userClass = new classes.User()
    userClass.fromApiPost(request.body)
  } catch (error) {
    response.send(new errors.BadRequestError(`this user would not get created (${error.message})`))
    return next(false)
  }
  (async () => {
    try {
      await getExistingTeam(userClass.teamId)
    } catch (error) {
      response.send(new errors.BadRequestError('team does not exist apparently'))
      return next(false)
    }
  })()
  getExistingUser(userClass.email)
    .then(() => {
      response.send(new errors.BadRequestError('this email is already in use'))
      return next(false)
    })
    .catch(() => {
      getPasswordHash(request.body.password, (error, result) => {
        if (error) {
          console.error('[route users create] bcrypt errback', error)
          response.send(new errors.InternalServerError('couldnt create user (bcrypt.hash)'))
          return next(false)
        }
        userClass.activate()
        userClass.passwordHash = result
        datalayer.write('Users', userClass.id, userClass.toDatastore())
          .then(() => {
            response.send(userClass.toApi())
            return next()
          })
          .catch(error => {
            console.error('[route users create] datalayer.write caught', error)
            response.send(new errors.InternalServerError('couldnt create user'))
            return next(false)
          })
      })
    })
}

module.exports = route
