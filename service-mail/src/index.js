const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const send = require('./send')

if (typeof process.env.PORT !== 'string') {
  console.error('PORT environment variable is missing')
  process.exit(1)
}

const PORT = parseInt(process.env.PORT, 10)

const router = new Router({
  prefix: '/v1'
})
router.post('/mail', send)

const app = new Koa()
app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
