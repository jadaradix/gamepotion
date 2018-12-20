const path = require('path')
const fs = require('fs')
const os = require('os')

const DIRECTORY = '/Users/james.garner/Dropbox/Projects/gmc/resource sets/Cilein Kearns'

const listFilesInDirectory = (directory) => {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (error, files) => {
      if (error) {
        return reject(error)
      }
      return resolve(files.filter(file => file.indexOf('.png') !== -1))
    })
  })
}

(async () => {
  const files = await listFilesInDirectory(DIRECTORY)
  const bashLines = files.map(file => {
    // fixed-module-cilein-kearns-PacMan Pack-GhostEyes.png
    let newName = 'fixed-image-' + file.substring('fixed-module-'.length)
    return `mv "${path.join(DIRECTORY, file)}" "${path.join(DIRECTORY, newName)}";`
  })
  const bash = bashLines.join(os.EOL)
  console.log(bash)
})()
