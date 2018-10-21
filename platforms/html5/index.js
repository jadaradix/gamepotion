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

const platform = (team, project, resources) => {
  const figuredOut = {
    resources: resources.map(resource => resource.toApi())
  }
  const code = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${project.name}</title>
        <script src="${getRemoteStaticUrl()}" async>
        <script>
          window.addEventListener('load', function () {
            const game = new window.GMC()
            game.setResources(${JSON.stringify(figuredOut.resources)})

            const canvasElement = document.querySelector('gmc-game')
            game.start(canvasElement)
          })
        </script>
      </head>
      <body>
        <canvas id="gmc-game">Your browser doesn&rsquo;t support the &lt;canvas&gt; element.</canvas>
      </body>
    </html>
  `
  return new Promise((resolve, reject) => {
    resolve(code)
  })
}

module.exports = platform
