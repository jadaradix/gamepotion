const work = (team, project, resources) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${project.name}</title>
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
