const work = require('./work.js')
const classFactory = require('./classes/factory.js')

test('works', () => {
  const team = classFactory.team()
  const project = classFactory.project()
  const resources = [
    classFactory.resource({
      type: 'space',
      name: 'Bird Space',
      events: {}
    })
  ]

  return work(team, project, resources)
    .then(result => {
      expect(result).toMatchSnapshot()
    })
})
