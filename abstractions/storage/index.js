const fs = require('fs')
const { Storage } = require('@google-cloud/storage')
const storage = new Storage({
  projectId: 'thegmc-219013'
})
const BUCKET = 'gmc-resources'
const bucket = storage.bucket(BUCKET)

const doUpload = (stuff, filename, mimetype) => {
  const file = bucket.file(filename)
  const stream = file.createWriteStream({
    metadata: {
      contentType: mimetype
    }
  })
  return new Promise((resolve, reject) => {
    stream.on('error', (err) => {
      return reject(err)
    })
    stream.on('finish', () => {
      file.makePublic().then(() => {
        return resolve({
          https: `https://storage.googleapis.com/${BUCKET}/${filename}`,
          gs: `gs://${BUCKET}/${filename}`
        })
      })
    })
    stream.end(stuff)
  })
}

module.exports = {
  'file': (fullyQualifiedFilename, filename, mimetype = 'image/png') => {
    return new Promise((resolve, reject) => {
      fs.readFile(fullyQualifiedFilename, (error, data) => {
        if (error) return reject(new Error(`couldnt fs.readFile ${fullyQualifiedFilename}`))
        const base64Data = Buffer.from(data, 'binary')
        doUpload(base64Data, filename, mimetype).then(resolve).catch(reject)
      })
    })
  },
  'stream': (stream, filename, mimetype = 'image/png') => {
    return doUpload(stream, filename, mimetype)
  }
}
