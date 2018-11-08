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

test('doesnt create a user with a bad name (class testing)', (done) => {
  axios({
    method: 'post',
    url: `${URL_API_CORE}/users`,
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
    url: `${URL_API_CORE}/users`,
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

test('gets the user', (done) => {
  axios({
    method: 'get',
    url: `${URL_API_CORE}/me`,
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
  
test('doesnt get a user that has a bad email', (done) => {
  axios({
    method: 'get',
    url: `${URL_API_CORE}/me`,
    validateStatus: false,
    auth: {
      username: 'blah@blah',
      password: 'blah blah'
    }
  })
    .then(response => {
      expect(response.status).toBe(401)
      expect(response.data.message).toBe('unknown e-mail address')
      return done()
    })
    .catch(done)
})

// middlware doesnt validate password in test mode (sorry)
// test('doesnt get a user that has a bad password', (done) => {
//   axios({
//     method: 'get',
//     url: `${URL_API_CORE}/me`,
//     validateStatus: false,
//     auth: {
//       username: configs.auth.auth.username,
//       password: 'blah blah'
//     }
//   })
//     .then(response => {
//       expect(response.status).toBe(401)
//       expect(response.data.message).toBe('wrong password')
//       return done()
//     })
//     .catch(done)
// })

test('updates the user', (done) => {
  axios({
    method: 'patch',
    url: `${URL_API_CORE}/me`,
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
    url: `${URL_API_CORE}/me`,
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
    url: `${URL_API_CORE}/me`,
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
    url: `${URL_API_CORE}/me`,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(401)
      return done()
    })
    .catch(done)
})
