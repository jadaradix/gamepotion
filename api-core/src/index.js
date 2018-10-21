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
  ['EXACT', 'GET', '/v1'],
  ['EXACT', 'POST', '/v1/users']
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
  'GET      /v1/actions': require('./routes/actions'),
  // -> users
  'POST     /v1/users': require('./routes/users/create'),
  'GET      /v1/me': require('./routes/users/get'),
  'PATCH    /v1/me': require('./routes/users/update'),
  'DEL      /v1/me': require('./routes/users/delete'),
  //   -> teams
  'POST     /v1/teams': require('./routes/users/teams/create'),
  'GET      /v1/me/team': require('./routes/users/teams/get'),
  'PATCH    /v1/me/team': require('./routes/users/teams/update'),
  'DEL      /v1/me/team': require('./routes/users/teams/delete'),
  //     -> users
  'GET      /v1/me/team/users': require('./routes/users/teams/users/getAll'),
  //     -> projects
  'POST     /v1/me/team/projects': require('./routes/users/teams/projects/create'),
  'GET      /v1/me/team/projects': require('./routes/users/teams/projects/getAll'),
  'GET      /v1/me/team/projects/:id': require('./routes/users/teams/projects/get'),
  'DEL      /v1/me/team/projects/:id': require('./routes/users/teams/projects/delete'),
  // ->      -> resources
  'GET      /v1/me/team/projects/:id/resources': require('./routes/users/teams/projects/resources/getAll')
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
  console.log('api-core; listening at %s', server.name, server.url)
})
