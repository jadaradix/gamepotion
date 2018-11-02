const factory = require('../factory-commonjs.js')

test('creates a resource based on type (image; no name)', () => {
  const resource = factory.resource({
    type: 'image'
  })
  expect(resource.type).toBe('image')
  expect(resource.name).toBe('New Image')
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
    events: {
      'create': [
        {
          name: 'Debug',
          runArguments: ['hello', 'world']
        },
        {
          name: 'Qwe Qwe Qwe',
          runArguments: ['one', 'two', ' three']
        }
      ]
    }
  })
  expect(resource.type).toBe('atom')
  expect(resource.events).toEqual({
    'create': [
      {
        name: 'Debug',
        runArguments: ['hello', 'world']
      }
    ]
  })
})

test('doesnt create a resource when the type is stupid', () => {
  expect(
    () => {
      const resource = factory.resource({
        type: 'qweqweqwe',
        name: 'Qwe Qwe Qwe Thing'
      })
    }
  ).toThrow()
})
