export function project(environment, projectId) {
  const environments = {
    'local': `http://localhost:3000/projects/${projectId}`,
    'production': `https://app.gamemaker.club/projects/${projectId}`
  }
  return environments[environment]
}

export function playProject(environment, projectId) {
  const environments = {
    'local': `http://localhost:3001/${projectId}`,
    'production': `https://play.gamemaker.club/${projectId}`
  }
  return environments[environment]
}
