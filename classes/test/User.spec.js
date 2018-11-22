const User = require('../dist/User.js')

test('can be created (and has no passwordHash)', () => {
  const user = new User()
  expect(typeof user.id).toBe('string')
  expect(user.passwordHash).toBeNull()
})

test('can be created from an API call', () => {
  const user = new User()
  const body = {
    teamId: 'team-id',
    userlandId: 'james@gamemaker.club'
  }
  user.fromApiPost(body)
  expect(user.name).toBe('James')
  expect(user.userlandId).toBe('james@gamemaker.club')
})

test('throws an error when being created from an API call if there is no userlandId', () => {
  const user = new User()
  const body = {
    teamId: 'team-id'
  }
  expect(() => user.fromApiPost(body)).toThrow('userlandId is not valid')
})

test('can be updated from an API call', () => {
  const user = new User()
  user.name = 'James'
  user.userlandId = 'james@gamemaker.club'
  const body = {
    teamId: 'should-be-persisted',
    name: 'Robert',
    userlandId: 'fatquack@gamemaker.club',
    id: 'should-not-be-persisted'
  }
  user.fromApiPatch(body)
  expect(user.name).toBe('Robert')
  expect(user.userlandId).toBe('fatquack@gamemaker.club')
  expect(user.teamId).toBe('should-be-persisted')
  expect(user.id).not.toBe('should-not-be-persisted')
})

test('can have its subscription updated', () => {
  const user = new User()
  user.name = 'James'
  user.userlandId = 'james@gamemaker.club'
  expect(user.getSubscription().id).toBe('free')
  user.updateSubscription('pro')
  expect(user.getSubscription().id).toBe('pro')
})
