const route = (request, response, next) => {
  response.send(request.authorization.user.toApi())
  return next()
}

module.exports = route
