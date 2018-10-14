const User = require('../dist/User.js').default

test('is not activated when it is created', () => {
  const user = new User()
  expect(typeof user.id).toBe('string')
  expect(user.activationCode.indexOf('todo-')).toBe(0)
  expect(user.isActivated()).toBe(false)
})

test('can be activated', () => {
  const user = new User()
  expect(user.isActivated()).toBe(false)
  expect(user.activationCode.indexOf('todo-')).toBe(0)
  user.activate()
  expect(user.activationCode.indexOf('done-')).toBe(0)
  expect(user.isActivated()).toBe(true)
})

test('can be created from an API call', () => {
  const user = new User()
  const body = {
    teamId: 'team-id',
    name: 'James',
    email: 'j@jada.io'
  }
  user.fromApiPost(body)
  expect(user.name).toBe('James')
  expect(user.email).toBe('j@jada.io')
})

test('throws an error when being created from an API call if there is no teamId', () => {
  const user = new User()
  const body = {
    name: 'James',
    email: 'j@jada.io'
  }
  expect(() => user.fromApiPost(body)).toThrow('teamId is not valid')
})

test('throws an error when being created from an API call if there is no name', () => {
  const user = new User()
  const body = {
    teamId: 'team-id',
    email: 'j@jada.io'
  }
  expect(() => user.fromApiPost(body)).toThrow('name is not valid')
})

test('throws an error when being created from an API call if there is a bad email', () => {
  const user = new User()
  const body = {
    teamId: 'team-id',
    name: 'James',
    email: 'xyz'
  }
  expect(() => user.fromApiPost(body)).toThrow('email is not valid')
})

test('can be updated from an API call', () => {
  const user = new User()
  user.name = 'James'
  user.email = 'j@jada.io'
  const body = {
    name: 'Robert',
    email: 'r@jada.io',
    id: 'xyz'
  }
  user.fromApiPatch(body)
  expect(user.name).toBe('Robert')
  expect(user.email).toBe('r@jada.io')
  expect(user.id).not.toBe('xyz')
})
