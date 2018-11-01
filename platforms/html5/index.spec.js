const platform = require('./index.js')
const classFactory = require('./classes/factory-commonjs.js')

test('works', () => {
  const team = classFactory.team()
  const project = classFactory.project()
  let resources = [
    classFactory.resource({
      type: 'space',
      name: 'Bird Space',
      events: {}
    })
  ]
  // jest hacks
  team.id = 'jest-hack-team-id'
  project.id = 'jest-hack-project-id'
  resources = resources.map(resource => {
    resource.id = `jest-hack-${resource.name}`
    resource.createdAt = 0
    return resource
  })
  //

  return platform(team, project, resources)
    .then(result => {
      expect(result).toMatchSnapshot()
    })
})
