import canvasRenderSpace from './index.js'

describe('canvasRenderSpace', () => {
  it('works', () => {
    const element = null
    const space = null
    const resources = []
    const c = canvasRenderSpace(element, space, resources)
    expect(c).toBe(null)
  })
})
