const Team = require('../dist/Team.js').default

test('can be created', () => {
  const team = new Team()
  expect(typeof team.id).toBe('string')
  expect(typeof team.createdAt).toBe('number')
  expect(typeof team.name).toBe('string')
})

test('can be created from an API call', () => {
  const team = new Team()
  const body = {
    name: 'FatQuack'
  }
  team.fromApiPost(body)
  expect(team.name).toBe('FatQuack')
})

test('throws an error when being created from an API call if there is no name', () => {
  const team = new Team()
  const body = {}
  expect(() => team.fromApiPost(body)).toThrow('name is not valid')
})

test('can be updated from an API call', () => {
  const team = new Team()
  team.name = 'Invisionsoft'
  const body = {
    name: 'FatQuack',
    id: 'xyz'
  }
  team.fromApiPatch(body)
  expect(team.id).not.toBe('xyz')
  expect(team.name).toBe('FatQuack')
})
