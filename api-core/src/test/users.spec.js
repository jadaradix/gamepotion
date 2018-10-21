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

test('doesnt create a user with a bad name (class testing)', (done) => {
  axios({
    method: 'post',
    url: `${API_URL}/users`,
    data: {
      name: '',
      email: 'j@jada.io',
      password: 'qweqweqwe'
    },
    ...configs.noAuth
  })
    .then(response => {
      expect(response.status).toBe(400)
      expect(response.data.message).toBe('this would not get created (name is not valid)')
      return done()
    })
    .catch(done)
})

test('doesnt create a user with a bad password (route testing)', (done) => {
  axios({
    method: 'post',
    url: `${API_URL}/users`,
    data: {
      name: 'james',
      email: 'j@jada.io',
      password: ''
    },
    ...configs.noAuth
  })
    .then(response => {
      expect(response.status).toBe(400)
      expect(response.data.message).toBe('password does not conform')
      return done()
    })
    .catch(done)
})

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

test('gets the user', (done) => {
  axios({
    method: 'get',
    url: `${API_URL}/me`,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data.teamId).toBe(null)
      expect(response.data.name).toBe('James')
      return done()
    })
    .catch(done)
})

test('updates the user', (done) => {
  axios({
    method: 'patch',
    url: `${API_URL}/me`,
    data: {
      name: 'Robert'
    },
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data.name).toBe('Robert')
      return done()
    })
    .catch(done)
})

test('gets the user (update persisted)', (done) => {
  axios({
    method: 'get',
    url: `${API_URL}/me`,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data.name).toBe('Robert')
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

test('doesnt get the user after deletion', (done) => {
  axios({
    method: 'get',
    url: `${API_URL}/me`,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(401)
      return done()
    })
    .catch(done)
})
