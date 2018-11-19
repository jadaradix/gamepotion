import {
  project,
  playProject,
} from './index.js'

const NODE_ENV = 'production'

describe('interRouter', () => {
  it('generates a project route', () => {
    const link = project(NODE_ENV, 'xyz')
    expect(link).toBe('https://app.gamemaker.club/projects/xyz')
  })

  it('generates a playProject route', () => {
    const link = playProject(NODE_ENV, 'xyz')
    expect(link).toBe('https://play.gamemaker.club/xyz')
  })
})
