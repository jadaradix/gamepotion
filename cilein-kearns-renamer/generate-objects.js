const path = require('path')
const fs = require('fs')
const os = require('os')
const humanizeString = require('humanize-string')
const imageSize = require('image-size')

const DIRECTORY = '/Users/james.garner/Dropbox/Projects/gmc/resource sets/Cilein Kearns'

const getImageSize = (file) => {
  return new Promise((resolve, reject) => {
    imageSize(file, function (err, size) {
      const {
        width,
        height
      } = size
      return resolve(
        {
          width,
          height
        }
      )
    })
  })
}

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
  const objects = await Promise.all(files.map(async file => {
    let id = file.substring('fixed-image-cilein-kearns-'.length)
    id = id.substring(0, id.length - '.png'.length)
    const [pack, name] = id.split('-')
    const size = await getImageSize(path.join(DIRECTORY, file))
    return {
      id,
      name: `${pack} > ${humanizeString(name)}`,
      ...size
    }
  }))
  console.log(objects)
})()
