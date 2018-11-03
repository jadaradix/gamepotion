const axios = require('axios')

const URL_API_CORE = 'http://localhost:1025/v1'

const configs = {
  noAuth: {
    validateStatus: false
  }
}

test('gets the news', (done) => {
  axios({
    method: 'get',
    url: `${URL_API_CORE}/news`,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(200)
      expect(Array.isArray(response.data)).toBe(true)
      return done()
    })
    .catch(done)
})
