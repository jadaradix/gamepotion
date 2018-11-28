const Middleware = require('restify-cors-middleware')
const CORS_ORIGINS = (() => {
  // console.log('[middleware-cors] process.env.NODE_ENV', process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'local') {
    return ['*']
  }
  return [
    'http://localhost:3000', 'https://app.gamemaker.club',
    'http://localhost:3001', 'https://store.gamemaker.club',
    'http://localhost:3002', 'https://gamemaker.club',
    'http://localhost:3003', 'https://play.gamemaker.club',
  ]
})()

const middleware = Middleware({
  preflightMaxAge: 5,
  origins: CORS_ORIGINS,
  allowHeaders: ['Authorization'],
  exposeHeaders: []
})

module.exports = middleware
