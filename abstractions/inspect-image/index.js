const sizeOf = require('image-size')

const inspectImage = (imagePath) => {
  return new Promise((resolve, reject) => {
    sizeOf(imagePath, (error, dimensions) => {
      if (error) {
        return reject(error)
      }
      const {
        width,
        height
      } = dimensions
      return resolve({
        width,
        height
      })
    })
  })
}

module.exports = inspectImage
