const assert = require('assert').strict
const got = require('got')

const BRAND_NAME = 'Gamepotion'
const SERVICE_MAIL_URL = 'http://openbox-mail:2010'

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

const templates = {
  'welcome': {
    subject: `Welcome to ${BRAND_NAME}`,
    contentText({ name, password }) {
      return `Hey ${name},

Thanks for joining ${BRAND_NAME}! Welcome.

Your nearly-impossible-to-guess password is ${password}. Please go to 'My account' and choose 'Change password'.

${BRAND_NAME}`
    },
    contentHtml({ name, password }) {
      return `<p>Hey ${name},</p>

<p>Thanks for joining ${BRAND_NAME}! Welcome.</p>

<p>Your nearly-impossible-to-guess password is <strong>${password}</strong>. Please go to 'My account' and choose 'Change password'.</p>

<p>${BRAND_NAME}</p>`
    }
  }
}

const sendGenericMail = async (template, userClass, extras = {}) => {
  const {
    name
  } = userClass
  const {
    subject,
    contentText,
    contentHtml
  } = templates[template]
  await sendMail({
    subject,
    to: userClass.userlandId,
    contentText: contentText({ name, ...extras }),
    contentHtml: contentHtml({ name, ...extras })
  })
}

module.exports = sendGenericMail
