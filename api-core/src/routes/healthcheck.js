const route = async (request, response, next) => {
  response.header('content-type', 'text/plain')
  response.send('ok!')
  return next()
}

module.exports = route
