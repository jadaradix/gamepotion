const errors = require('restify-errors')
const bcrypt = require('bcrypt-nodejs')
const classes = require('../../classes/dist.js')
const datalayer = require('../datalayer')

const skipPasswordCheck = (process.env.NODE_ENV === 'local')
console.log('[middleware-auth] process.env.NODE_ENV', process.env.NODE_ENV)
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
      return (request.method === method && request.getUrl().pathname.startsWith(route))
    } else {
      return (request.method === method && request.getUrl().pathname === route)
    }
  })

  if (request.authorization.hasOwnProperty('scheme') && request.authorization.scheme === 'Bearer') {
    const accessToken = request.authorization.credentials
    return datalayer.readOne('Users', {accessToken})
      .then(object => {
        const user = new classes.User(object)
        request.authorization.user = user
        request.authorization.method = 'basic'
        return next()
      })
      .catch(() => {
        response.send(new errors.UnauthorizedError('unknown access token'))
        return next(false)
      })
  }

  if (request.authorization.hasOwnProperty('scheme') && request.authorization.scheme === 'Basic') {
    if (request.authorization.basic.username === null || request.authorization.basic.password === null) {
      response.send(new errors.UnauthorizedError('basic auth does not support empty values (probably a zero length password)'))
      return next(false)
    } else {
      let userlandId = request.authorization.basic.username
      let password = request.authorization.basic.password
      return datalayer.readOne('Users', {userlandId})
        .then(object => {
          const user = new classes.User(object);
          (async () => {
            try {
              await comparePasswordAndPasswordHash(password, object.passwordHash)
              request.authorization.user = user
              request.authorization.method = 'basic'
              return next()
            } catch (error) {
              if (skipPasswordCheck === true) {
                console.log('[middleware-auth] skipPasswordCheck is true (this is good)')
                request.authorization.user = user
                request.authorization.method = 'basic'
                return next()
              } else {
                console.error('[middleware-auth] bad password', error)
                if (isThisRoutePublic === false) {
                  response.send(new errors.UnauthorizedError('wrong password'))
                  return next(false)
                } else {
                  return next()
                }
              }
            }
          })()
        })
        .catch((error) => {
          console.error('[middleware-auth] potentially major catch', error)
          response.send(new errors.UnauthorizedError('unknown e-mail address'))
          return next(false)
        })
    }
  }

  if (isThisRoutePublic) {
    return next()
  } else {
    response.send(new errors.UnauthorizedError('authentication was not attempted!'))
    return next(false)
  }
}

module.exports = middleware
