import {
  appProject,
  storeHome,
  siteHome,
  playProject,
} from './index.js'

const NODE_ENV = 'production'

describe('interRouter', () => {
  it('generates an app project route', () => {
    const link = appProject(NODE_ENV, 'xyz')
    expect(link).toBe('https://app.gamemaker.club/projects/xyz')
  })

  it('generates a store home route', () => {
    const link = storeHome(NODE_ENV, 'api-key')
    expect(link).toBe('https://store.gamemaker.club/api-key')
  })

  it('generates a site home route', () => {
    const link = siteHome(NODE_ENV)
    expect(link).toBe('https://gamemaker.club')
  })

  it('generates a play project route', () => {
    const link = playProject(NODE_ENV, 'xyz')
    expect(link).toBe('https://play.gamemaker.club/xyz')
  })
})
