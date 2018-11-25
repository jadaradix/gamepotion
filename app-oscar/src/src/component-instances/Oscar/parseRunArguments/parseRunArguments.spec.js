import parseRunArguments from './parseRunArguments'

const parseContext = {
  instanceClass: {
    props: {
      x: 100,
      y: 200
    }
  },
  camera: {
    x: 300,
    y: 400
  },
  eventContext: {
    variables: new Map([
      ['name', 'James']
    ])
  }
}

test('works for a resource (atom)', () => {
  const argType = 'atom'
  const arg = 'atom-id'
  const r = parseRunArguments([argType], [arg], parseContext)[0]
  expect(r).toBe('atom-id')
})

test('works for a string', () => {
  const argType = 'generic'
  const arg = '"test"'
  const r = parseRunArguments([argType], [arg], parseContext)[0]
  expect(r).toBe('test')
})

test('works for a number', () => {
  const argType = 'generic'
  const arg = '100'
  const r = parseRunArguments([argType], [arg], parseContext)[0]
  expect(r).toBe(100)
})

test('works for a boolean', () => {
  const argType = 'generic'
  const arg = true
  const r = parseRunArguments([argType], [arg], parseContext)[0]
  expect(r).toBe(true)
})

test('works for a variable', () => {
  const argType = 'generic'
  const arg = 'name'
  const r = parseRunArguments([argType], [arg], parseContext)
  expect(r[0]).toBe('James')
})

test('doesnt work for an undefined variable', () => {
  const argType = 'generic'
  const arg = 'undefined'
  expect(() => {
    parseRunArguments([argType], [arg], parseContext)
  })
    .toThrow('could not parse undefined')
})

test('works for random() function', () => {
  const argType = 'generic'
  const arg = 'random(1, 4)'
  const r = parseRunArguments([argType], [arg], parseContext)
  expect(typeof r[0]).toBe('number')
})

test('doesnt work for blah() function that doesnt exist', () => {
  const argType = 'generic'
  const arg = 'blah(1, 2)'
  expect(() => {
    parseRunArguments([argType], [arg], parseContext)
  })
    .toThrow('you tried to call function blah() which doesnt exist!')
})

test('doesnt work for random() function with wrong number of arguments', () => {
  const argType = 'generic'
  const arg = 'random(1, 4, 5)'
  expect(() => {
    parseRunArguments([argType], [arg], parseContext)
  })
    .toThrow('you tried to call function random() with 3 arguments instead of 2')
})

test('works for an instance property', () => {
  const argType = 'generic'
  const arg = 'instance.x'
  const r = parseRunArguments([argType], [arg], parseContext)
  expect(r[0]).toBe(100)
})

test('works for a camera property', () => {
  const argType = 'generic'
  const arg = 'camera.x'
  const r = parseRunArguments([argType], [arg], parseContext)
  expect(r[0]).toBe(300)
})
