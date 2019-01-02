export function appDashboard(environment) {
  const environments = {
    'development': 'http://localhost:3000/dashboard',
    'production': 'https://app.gamemaker.club/dashboard'
  }
  return environments[environment]
}

export function appProject(environment, projectId) {
  const environments = {
    'development': `http://localhost:3000/projects/${projectId}`,
    'production': `https://app.gamemaker.club/projects/${projectId}`
  }
  return environments[environment]
}

export function store(environment, route, accessToken) {
  const environments = {
    'development': `http://localhost:3001/${route}?accessToken=${accessToken}`,
    'production': `https://store.gamemaker.club/${route}?accessToken=${accessToken}`
  }
  return environments[environment]
}

export function playProject(environment, projectId) {
  const environments = {
    'development': `http://localhost:3002/${projectId}`,
    'production': `https://play.gamemaker.club/${projectId}`
  }
  return environments[environment]
}

export function siteHome(environment) {
  const environments = {
    'development': 'http://localhost:3003',
    'production': 'https://gamemaker.club'
  }
  return environments[environment]
}
