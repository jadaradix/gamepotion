const envs = [
  'sticky.to'
]

const Middleware = require('restify-cors-middleware')
const CORS_ORIGINS = (() => {
  // console.log('[middleware-cors] process.env.NODE_ENV', process.env.NODE_ENV)
  // if (process.env.NODE_ENV === 'local') {
  //   return ['*']
  // }
  return envs.reduce(
    (acc, env) => {
      acc = acc.concat(
        [
          `https://gamepotion--app.${env}`,
          `https://gamepotion--app-store.${env}`,
          `https://gamepotion--app-play.${env}`,
          `https://${env}`
        ]
      )
      return acc
    },
    [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003'
    ]
  )

})()

const middleware = Middleware({
  preflightMaxAge: 5,
  origins: CORS_ORIGINS,
  allowHeaders: ['Authorization'],
  exposeHeaders: []
})

module.exports = middleware
