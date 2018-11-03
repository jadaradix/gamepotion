const uuid = require('./index.dist.js')

describe('uuid', () => {
  it('works', () => {
    const u = uuid()
    expect(typeof u).toBe('string')
    expect(u).toHaveLength(36)
  })
})
