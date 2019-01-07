const assert = require('assert').strict
const got = require('got')

const SERVICE_MAIL_URL = 'http://oscar-production-service-mail:1031'

const sendMail = async ({
  subject,
  to,
  contentText,
  contentHtml = contentText
}) => {
  assert(typeof subject === 'string', 'you need to provide a subject')
  assert(typeof to === 'string', 'you need to provide a to')
  assert(typeof contentText === 'string', 'you need to provide a contentText')
  assert(typeof contentHtml === 'string', 'you need to provide a contentHtml')
  try {
    await got(`${SERVICE_MAIL_URL}/v1/mail`, {
      method: 'post',
      json: true,
      body: {
        to,
        subject,
        contentText,
        contentHtml
      }
    })
  } catch (error) {
    console.error('[sendMail] error', error)
    throw new Error('Could not send message')
  }
}

module.exports = sendMail
