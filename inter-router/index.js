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

export function store(environment, route = '') {
  const environments = {
    'development': `http://localhost:3001/${route}`,
    'production': `https://store.gamemaker.club/${route}`
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

export function site(environment, route) {
  const environments = {
    'development': `http://localhost:3003/${route}`,
    'production': `https://gamemaker.club/${route}`
  }
  return environments[environment]
}
