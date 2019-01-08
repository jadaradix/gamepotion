import {
  appProject,
  store,
  site,
  playProject,
} from './index.js'

const NODE_ENV = 'development'

describe('interRouter', () => {
  it('generates an app project route', () => {
    const link = appProject(NODE_ENV, 'xyz')
    expect(link).toBe('http://localhost:3000/projects/xyz')
  })

  it('generates a store route', () => {
    const link = store(NODE_ENV, 'modules/pro')
    expect(link).toBe('http://localhost:3001/modules/pro')
  })

  it('generates a site route', () => {
    const link = site(NODE_ENV, 'credits')
    expect(link).toBe('http://localhost:3003/credits')
  })

  it('generates a play project route', () => {
    const link = playProject(NODE_ENV, 'xyz')
    expect(link).toBe('http://localhost:3002/xyz')
  })
})
