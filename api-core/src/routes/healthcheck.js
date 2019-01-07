const sendMail = require('../sendMail.js')

const route = async (request, response, next) => {
  await sendMail('Sample Message')
  response.header('content-type', 'text/plain')
  response.send('ok!')
  return next()
}

module.exports = route

