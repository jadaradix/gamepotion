const Middleware = require('restify-cors-middleware')
const CORS_ORIGINS = [
  'http://localhost:3000',
  'https://app.storydust.host'
]

const middleware = Middleware({
  preflightMaxAge: 5,
  origins: CORS_ORIGINS,
  allowHeaders: ['Authorization'],
  exposeHeaders: []
})

module.exports = middleware
