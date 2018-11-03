const axios = require('axios')
const createRandomString = require('../abstractions/createRandomString.js')

const URL_API_CORE = 'http://localhost:1025/v1'

const user = {
  name: 'James',
  email: `${createRandomString()}@gamemaker.club`,
  password: createRandomString()
}

const configs = {
  auth: {
    validateStatus: false,
    auth: {
      username: user.email,
      password: user.password
    }
  },
  noAuth: {
    validateStatus: false
  }
}

test('creates a user', (done) => {
  axios({
    method: 'post',
    url: `${URL_API_CORE}/users`,
    data: user,
    ...configs.noAuth
  })
    .then(response => {
      expect(response.status).toBe(201)
      expect(response.data.teamId).toBe(null)
      expect(response.data.name).toBe('James')
      return done()
    })
    .catch(done)
})

test('gets the actions', (done) => {
  axios({
    method: 'get',
    url: `${URL_API_CORE}/actions`,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(200)
      expect(Array.isArray(response.data)).toBe(true)
      return done()
    })
    .catch(done)
})

test('deletes the user', (done) => {
  axios({
    method: 'delete',
    url: `${URL_API_CORE}/me`,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(204)
      return done()
    })
    .catch(done)
})
