const productionBaseDomain = (() => {
  return window.location.hostname.substring(window.location.hostname.indexOf('.') + 1)
})()

export function appDashboard(environment) {
  const environments = {
    'development': 'http://localhost:3000/dashboard',
    'production': `https://app.${productionBaseDomain}/dashboard`
  }
  return environments[environment]
}

export function appProject(environment, projectId) {
  const environments = {
    'development': `http://localhost:3000/projects/${projectId}`,
    'production': `https://app.${productionBaseDomain}/projects/${projectId}`
  }
  return environments[environment]
}

export function store(environment, route = '') {
  const environments = {
    'development': `http://localhost:3001/${route}`,
    'production': `https://store.${productionBaseDomain}/${route}`
  }
  return environments[environment]
}

export function playProject(environment, projectId) {
  const environments = {
    'development': `http://localhost:3002/${projectId}`,
    'production': `https://play.${productionBaseDomain}/${projectId}`
  }
  return environments[environment]
}

export function site(environment, route) {
  const environments = {
    'development': `http://localhost:3003/${route}`,
    'production': `https://${productionBaseDomain}/${route}`
  }
  return environments[environment]
}
