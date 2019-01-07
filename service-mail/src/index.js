const assert = require('assert').strict
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
require('dotenv').config()

const send = require('./send')

assert(typeof process.env.PORT === 'string', 'PORT environment variable is missing')
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
