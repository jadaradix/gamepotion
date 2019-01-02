import {
  appProject,
  store,
  siteHome,
  playProject,
} from './index.js'

const NODE_ENV = 'production'

describe('interRouter', () => {
  it('generates an app project route', () => {
    const link = appProject(NODE_ENV, 'xyz')
    expect(link).toBe('https://app.gamemaker.club/projects/xyz')
  })

  it('generates a store route', () => {
    const link = store(NODE_ENV, 'modules/pro', 'access-token')
    expect(link).toBe('https://store.gamemaker.club/modules/pro?access-token')
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
