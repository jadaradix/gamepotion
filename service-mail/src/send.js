const sendgrid = require('@sendgrid/mail')
sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

const from = 'james@euphoricadventur.es'

const func = async ctx => {
  ctx.assert(ctx.body.to, 400, 'missing "to"')
  ctx.assert(ctx.body.subject, 400, 'missing "subject"')
  ctx.assert(ctx.body.contentText, 400, 'missing "contentText"')
  ctx.assert(ctx.body.contentHtml, 400, 'missing "contentHtml"')
  const {
    to,
    subject,
    contentText,
    contentHtml
  } = ctx.body
  const msg = {
    to,
    from,
    subject,
    text: contentText,
    html: contentHtml
  }
  await sendgrid.send(msg)
  ctx.body = 'ok'
}

module.exports = func
