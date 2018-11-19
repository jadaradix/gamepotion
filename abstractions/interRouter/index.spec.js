import interRouter from './index.js'

const NODE_ENV = 'production'

describe('interRouter', () => {

  it('generates a play route', () => {
    const link = interRouter(NODE_ENV, 'play', {'id': 'xyz'})
    expect(link).toBe('https://play.gamemaker.club/xyz')
  })

})
