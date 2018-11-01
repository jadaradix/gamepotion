const uuid = require('./index.dist.js')

describe('uuid', () => {
  it('works', () => {
    const u = uuid()
    console.log('u', u)
    expect(typeof u).toBe('string')
    expect(u).toHaveLength(36)
  })
})
