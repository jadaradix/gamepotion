// const productionBaseDomain = (() => {
//   if (process.env.NODE_ENV === 'production') {
//     return 'gamepotion.online'
//   }
//   return window.location.hostname.substring(window.location.hostname.indexOf('.') + 1)
// })()

export function appDashboard(environment) {
  const environments = {
    'development': 'http://localhost:3000/dashboard',
    'production': `https://gamepotion--app.sticky.to/dashboard`
  }
  return environments[environment]
}

export function appProject(environment, projectId) {
  const environments = {
    'development': `http://localhost:3000/projects/${projectId}`,
    'production': `https://gamepotion--app.sticky.to/projects/${projectId}`
  }
  return environments[environment]
}

export function store(environment, route = '') {
  const environments = {
    'development': `http://localhost:3001/${route}`,
    'production': `https://gamepotion--app-store.sticky.to/${route}`
  }
  return environments[environment]
}

export function playProject(environment, projectId) {
  const environments = {
    'development': `http://localhost:3002/${projectId}`,
    'production': `https://gamepotion--app-play.sticky.to/${projectId}`
  }
  return environments[environment]
}

export function site(environment, route) {
  const environments = {
    'development': `http://localhost:3003/${route}`,
    'production': `https://sticky.to/gamepotion/${route}`
  }
  return environments[environment]
}
