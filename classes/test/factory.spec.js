const factory = require('../factory-commonjs.js')

test('creates a resource based on type (image; no name)', () => {
  const resource = factory.resource({
    type: 'image'
  })
  expect(resource.type).toBe('image')
  expect(resource.name).toBe('New image')
})

test('creates a resource based on type (sound; provided name)', () => {
  const resource = factory.resource({
    type: 'sound',
    name: 'Bird Sound'
  })
  expect(resource.type).toBe('sound')
  expect(resource.name).toBe('Bird Sound')
})

test('creates an atom resource with events/actions (one action doesnt exist)', () => {
  const resource = factory.resource({
    type: 'atom',
    name: 'Bird Atom',
    events: [
      {
        id: 'Create',
        configuration: [],
        actions: [
          {
            id: 'Debug',
            runArguments: ['"hello world"'],
            appliesTo: 'this'
          },
          {
            id: 'Qwe Qwe Qwe',
            runArguments: ['one', 'two', ' three'],
            appliesTo: 'this'
          }
        ]
      }
    ]
  })
  expect(resource.type).toBe('atom')
  expect(resource.events[0].actions).toEqual([
    {
      id: 'Debug',
      runArguments: ['"hello world"'],
      appliesTo: 'this'
    }
  ])
})

test('doesnt create a resource when the type is stupid', () => {
  expect(
    () => {
      factory.resource({
        type: 'qweqweqwe',
        name: 'Qwe Qwe Qwe Thing'
      })
    }
  ).toThrow()
})
