const axios = require('axios')
const createRandomString = require('../abstractions/createRandomString.js')

const API_URL = 'http://localhost:1025/v1'

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
    url: `${API_URL}/users`,
    data: user,
    ...configs.noAuth
  })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data.teamId).toBe(null)
      expect(response.data.name).toBe('James')
      return done()
    })
    .catch(done)
})

test('gets the actions', (done) => {
  axios({
    method: 'get',
    url: `${API_URL}/actions`,
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
    url: `${API_URL}/me`,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(204)
      return done()
    })
    .catch(done)
})
