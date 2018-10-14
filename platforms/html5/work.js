const getRemoteStaticUrl = (environment = process.NODE_ENV) => {
  switch(environment) {
  case 'local':
    return 'dist-lib/index.js'
  case 'production':
    return 'https://gamemaker.club/static/platforms/html5/lib.js'
  default:
    return 'https://gamemaker.club/static/platforms/html5/lib.js'
  }
}

const work = (team, project, resources) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${project.name}</title>
        <script src="${getRemoteStaticUrl()}" async>
        <script>
          window.addEventListener('load', function () {
            const RESOURCE_SPACES = ${JSON.stringify(resources.filter(resource => resource.type === 'space').map(atom => atom.name))}
          })
        </script>
      </head>
      <body>

      </body>
    </html>
  `
  return new Promise((resolve, reject) => {
    resolve(html)
  })
}

module.exports = work
