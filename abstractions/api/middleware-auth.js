const errors = require('restify-errors')
const bcrypt = require('bcrypt-nodejs')
const classes = require('../../classes/dist.js')
const datalayer = require('../datalayer')

const skipPasswordCheck = false // (process.env.NODE_ENV === 'local')
console.log('[middleware-auth] skipPasswordCheck', skipPasswordCheck)

async function comparePasswordAndPasswordHash (password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (error, result) => {
      if (error) {
        return reject(new Error('bcrypt failed'))
      } else {
        if (result === true) {
          return resolve()
        } else {
          return reject(new Error('hashes are different'))
        }
      }
    })
  })
}

const middleware = (publicRoutes, request, response, next) => {
  const isThisRoutePublic = publicRoutes.some($ => {
    const mode = $[0]
    const method = $[1]
    const route = $[2]
    if (mode === 'START') {
      return (request.method === method && request.getUrl().pathname.indexOf(route) === 0)
    } else {
      return (request.method === method && request.getUrl().pathname === route)
    }
  })

  if (request.authorization.hasOwnProperty('scheme') && request.authorization.scheme === 'Basic') {
    if (request.authorization.basic.username === null || request.authorization.basic.password === null) {
      response.send(new errors.UnauthorizedError('basic auth does not support empty values (probably a zero length password)'))
      return next(false)
    } else {
      let email = request.authorization.basic.username
      let password = request.authorization.basic.password
      datalayer.readOne('Users', {email})
        .then(object => {
          const user = new classes.User(object);
          (async () => {
            let allowContinue = true
            try {
              await comparePasswordAndPasswordHash(password, object.passwordHash)
              request.authorization.user = user
              request.authorization.method = 'basic'
            } catch (error) {
              if (skipPasswordCheck === true) {
                console.error('[middleware-auth] skipPasswordCheck is true')
                allowContinue = true
                request.authorization.user = user
                request.authorization.method = 'basic'
              } else {
                console.error('[middleware-auth] bad password', error)
                if (isThisRoutePublic === false) {
                  response.send(new errors.UnauthorizedError('wrong password'))
                }
                allowContinue = false
              }
            } finally {
              next(allowContinue)
            }
          })()
        })
        .catch((error) => {
          if (isThisRoutePublic) {
            return next()
          } else {
            console.error('[middleware-auth] potentially major catch', error)
            response.send(new errors.UnauthorizedError('unknown e-mail address'))
            return next(false)
          }
        })
    }
  } else {
    if (isThisRoutePublic) {
      request.authorization.isAdmin = false
      return next()
    } else {
      response.send(new errors.UnauthorizedError('authentication was not attempted - does your bearer token start with "public:" or "private:"?'))
      return next(false)
    }
  }
}

module.exports = middleware
