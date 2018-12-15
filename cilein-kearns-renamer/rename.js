const path = require('path')
const fs = require('fs')
const os = require('os')

const DIRECTORY = '/Users/james/Dropbox/Projects/gmc/kearns sheets'

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
  const files = await listFilesInDirectory(path.join(DIRECTORY, process.argv[2]))
  const bashLines = files.map(file => {
    let newName = ''
    file.split('').forEach(c => {
      newName += c
    })
    return `mv "${path.join(DIRECTORY, process.argv[2], file)}" "${path.join(DIRECTORY, process.argv[2], '..', 'fixed-image-cilein-kearns-' + process.argv[2] + '-' + newName)}";`
  })
  const bash = bashLines.join(os.EOL)
  console.log(bash)
})()
