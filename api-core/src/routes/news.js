const news = []

const route = (request, response, next) => {
  response.send(news)
  return next()
}

module.exports = route
