const errors = require('restify-errors')

const middleware = (request, response, next) => {
  if ((request.method === 'POST' || request.method === 'PUT' || request.method === 'PATCH') && request.body === undefined) {
    response.send(new errors.BadRequestError('if you want to make a POST/PUT/PATCH request, include a body'))
    return next(false)
  }
  if (typeof request.globals !== 'object') {
    request.globals = {}
  }
  return next()
}

module.exports = middleware
