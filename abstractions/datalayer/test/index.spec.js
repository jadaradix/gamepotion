const datalayer = require('../index.js')

test('works', (done) => {
  return datalayer.readOne('Users', {})
    .then(user => {
      expect(typeof user).toBe('object')
      done()
    })
    .catch(done)
})
