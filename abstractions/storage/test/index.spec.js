const path = require('path')

const storage = require('../index')

describe('storage', () => {
  it('works with PNG default', (done) => {
    const filename = path.resolve('test', 'fixed-image-block.png')
    storage.file(filename, 'fixed-image-block.png')
      .then($ => {
        // console.log('$', $)
        expect($.https).toBe('https://storage.googleapis.com/gmc-resources/fixed-image-block.png')
        expect($.gs).toBe('gs://gmc-resources/fixed-image-block.png')
        done()
      })
      .catch(error => {
        done(error)
      })
  })

  it('works with WAV', (done) => {
    const filename = path.resolve('test', 'fixed-sound-zap.wav')
    storage.file(filename, 'fixed-sound-zap.wav', 'audio/wav')
      .then($ => {
        // console.log('$', $)
        expect($.https).toBe('https://storage.googleapis.com/gmc-resources/fixed-sound-zap.wav')
        expect($.gs).toBe('gs://gmc-resources/fixed-sound-zap.wav')
        done()
      })
      .catch(error => {
        done(error)
      })
  })
})
