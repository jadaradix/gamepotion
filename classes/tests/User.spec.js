const User = require('../dist/User.js').default

test('creates a user which is not activated', () => {
  const user = new User()
  expect(typeof user.id).toBe('string')
  expect(user.activationCode.indexOf('todo-')).toBe(0)
  expect(user.isActivated()).toBe(false)
})

test('actives a user', () => {
  const user = new User()
  expect(user.isActivated()).toBe(false)
  expect(user.activationCode.indexOf('todo-')).toBe(0)
  user.activate()
  expect(user.activationCode.indexOf('done-')).toBe(0)
  expect(user.isActivated()).toBe(true)
})

test('can be updated via an API call', () => {
  const user = new User()
  user.name = 'James'
  user.email = 'j@jada.io'
  user.fromApiPostBody({
  	name: 'Robert',
  	email: 'r@jada.io',
  	id: 'xyz'
  })
  expect(user.name).toBe('Robert')
  expect(user.email).toBe('r@jada.io')
  expect(user.id).not.toBe('xyz')
})
