require('dotenv').config()
const send = require('./send')

test('works', async () => {
  const assert = jest.fn()
  const ctx = {
    request: {
      body: {
        to: 'j@jada.io',
        subject: 'Hi James',
        contentText: 'Hey James',
        contentHtml: 'Hey <strong>James</strong>'
      }
    },
    assert
  }

  await send(ctx)
  expect(assert).toHaveBeenCalled()
  expect(typeof ctx.body).toBe('string')
})

test('provides basic validation by calling ctx assert', async () => {
  const assert = jest.fn(() => {
    throw new Error('validation error')
  })
  const ctx = {
    request: {
      body: {
        to: undefined
      }
    },
    assert
  }

  try {
    await send(ctx)
  } catch (error) {
    expect(error.message).toBe('validation error')
  }
})
