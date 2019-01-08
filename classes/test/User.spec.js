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
    userlandId: 'j@jada.io'
  }
  user.fromApiPost(body)
  expect(user.id).toHaveLength(36)
  expect(user.accessToken).toHaveLength(36)
  expect(user.name).toBe('James')
  expect(user.isTeamAdmin).toBe(true)
  expect(user.userlandId).toBe('j@jada.io')
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
  user.userlandId = 'j@jada.io'
  const body = {
    teamId: 'should-be-persisted',
    name: 'Robert',
    userlandId: 'me@fatquack.net',
    id: 'should-not-be-persisted'
  }
  user.fromApiPatch(body)
  expect(user.name).toBe('Robert')
  expect(user.userlandId).toBe('me@fatquack.net')
  expect(user.teamId).toBe('should-be-persisted')
  expect(user.id).not.toBe('should-not-be-persisted')
})

test('has Pro by default', () => {
  const user = new User()
  expect(user.modules[0].id).toBe('free')
  expect(user.modules[1].id).toBe('pro')
})
