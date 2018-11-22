import guessNameFromUserlandId from '../classes/guessNameFromUserlandId.js'

it ('works for case 1 (single word e-mail)', () => {
  const userlandId = 'j@jada.io'
  const name = guessNameFromUserlandId(userlandId)
  expect(name).toBe('J')
})

it ('works for case 2 (multi word e-mail)', () => {
  const userlandId = 'james.garner@jada.io'
  const name = guessNameFromUserlandId(userlandId)
  expect(name).toBe('James Garner')
})

it ('works for case 3 (not an e-mail)', () => {
  const userlandId = 'oauth-id'
  const name = guessNameFromUserlandId(userlandId)
  expect(name).toBe(null)
})
