const sendMail = require('../sendMail.js')

const route = async (request, response, next) => {
  try {
    await sendMail({
      subject: 'Sample Message',
      to: 'me@newty.org',
      contentText: 'hey there',
      contentHtml: '<p>hey there!</p>'
    })
    response.header('content-type', 'text/plain')
    response.send('ok!')
    return next()
  } catch (error) {
    response.send(500, 'could not perform healthcheck')
    return next()
  }
}

module.exports = route
