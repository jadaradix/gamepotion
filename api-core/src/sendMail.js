const got = require('got')

const SERVICE_MAIL_URL = 'http://oscar-production-service-mail:1031'

const sendMail = async (subject) => {
  try {
    await got(`${SERVICE_MAIL_URL}/v1/mail`, {
      method: 'post',
      json: true,
      body: {
        to: 'me@newty.org',
        subject,
        contentText: 'Some Content',
        contentHtml: '<p>Some HTML </p>'
      }
    })
  } catch (error) {
    console.error(error)
    throw new Error('Could not send message')
  }
}

module.exports = sendMail
