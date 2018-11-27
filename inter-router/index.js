export function appProject(environment, projectId) {
  const environments = {
    'local': `http://localhost:3000/projects/${projectId}`,
    'production': `https://app.gamemaker.club/projects/${projectId}`
  }
  return environments[environment]
}

export function storeHome(environment, accessToken) {
  const environments = {
    'local': `http://localhost:3001/${accessToken}`,
    'production': `https://store.gamemaker.club/${accessToken}`
  }
  return environments[environment]
}

export function siteHome(environment) {
  const environments = {
    'local': 'http://localhost:3002',
    'production': 'https://gamemaker.club'
  }
  return environments[environment]
}

export function playProject(environment, projectId) {
  const environments = {
    'local': `http://localhost:3003/${projectId}`,
    'production': `https://play.gamemaker.club/${projectId}`
  }
  return environments[environment]
}
