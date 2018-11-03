const restify = require('restify')
require('console-stamp')(console)

const server = restify.createServer(
  {
    // https://github.com/restify/node-restify/issues/1456
    formatters: {
      'text/plain': (req, res, body) => body,
      'text/html': (req, res, body) => body
    }
  }
)

const middlewareAuthPublicRoutes = [
]

const morgan = require('morgan')
server.use(morgan(':date[iso] :method :url :status (:response-time[3]ms)'))

server.pre(restify.plugins.pre.dedupeSlashes())
server.use(restify.plugins.authorizationParser())
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser({mapParams: false}))
server.use(restify.plugins.throttle({
  burst: 20, // requests per second
  rate: 20,
  username: true,
  setHeaders: false
}))

const middlewareAuth = require('./abstractions/api/middleware-auth')
const middlewareStoopid = require('./abstractions/api/middleware-stoopid')
const middlewares = {
  'auth': (request, response, next) => {
    return middlewareAuth(middlewareAuthPublicRoutes, request, response, next)
  },
  'stoopid': (request, response, next) => {
    return middlewareStoopid(request, response, next)
  }
}

const routes = {
  'GET      /v1': require('./routes/healthcheck'),
  'POST     /v1/me/team/projects/:projectId/resources/:resourceId': require('./routes/users/teams/projects/resources/update'),
}

const corsMiddleware = require('./abstractions/api/middleware-cors')
server.pre(corsMiddleware.preflight)
server.use(corsMiddleware.actual)

for (let middleware in middlewares) {
  server.use(middlewares[middleware])
}
for (let route in routes) {
  let method = route.split('/')[0].trim().toLowerCase()
  let path = route.substring(route.indexOf('/'))
  server[method](path, routes[route])
}

server.listen(process.env.PORT, () => {
  console.log('api-bin; listening at %s', server.name, server.url)
})
