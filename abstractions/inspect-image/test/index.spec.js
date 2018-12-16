const path = require('path')
const inspectImage = require('../index.js')

const IMAGE_PATH = path.join(__dirname, 'image.png')

test('works', (done) => {
  inspectImage(IMAGE_PATH)
    .then(result => {
      expect(result.width).toBe(32)
      expect(result.height).toBe(32)
      done()
    })
    .catch(done)
})
