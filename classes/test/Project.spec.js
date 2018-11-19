const Project = require('../dist/Project.js').default

test('can be created', () => {
  const project = new Project()
  expect(typeof project.id).toBe('string')
  expect(typeof project.createdAt).toBe('number')
  expect(typeof project.name).toBe('string')
})

test('can be created from an API call', () => {
  const project = new Project()
  const body = {
    teamId: 'teamId-xyz',
    name: 'Aggressive Avians'
  }
  project.fromApiPost(body)
  expect(project.name).toBe('Aggressive Avians')
})

test('throws an error when being created from an API call if there is an empty name', () => {
  const project = new Project()
  const body = {
    teamId: 'teamId-xyz',
    name: ''
  }
  expect(() => project.fromApiPost(body)).toThrow('name is not valid')
})

test('can be updated from an API call', () => {
  const project = new Project()
  project.name = 'Aggressive Avians'
  const body = {
    id: 'id-xyz',
    teamId: 'teamId-xyz',
    name: 'DinoRun'
  }
  project.fromApiPatch(body)
  expect(project.id).not.toBe('id-xyz')
  expect(project.teamId).not.toBe('teamId-xyz')
  expect(project.name).toBe('DinoRun')
})
