/**
 * @jest-environment node
*/

const axios = require('axios')

const URL_API_CORE = 'http://localhost:1025/v1'

const configs = {
  noAuth: {
    validateStatus: false
  }
}

test('calls back', () => {
  return axios({
    method: 'get',
    url: `${URL_API_CORE}/stripe-callback`,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(200)
    })
})
