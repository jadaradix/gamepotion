/**
 * @jest-environment node
 */

const axios = require('axios')
const createRandomString = require('../abstractions/createRandomString.js')

const URL_API_CORE = 'http://localhost:1025/v1'

const id = createRandomString()
const user = {
  userlandId: `xxx${id}@example.com`
}

const configs = {
  auth: {
    validateStatus: false,
    auth: {
      username: user.userlandId,
      password: '???'
    }
  },
  noAuth: {
    validateStatus: false
  }
}

test('doesnt create a user with a bad userlandId (class testing)', (done) => {
  axios({
    method: 'post',
    url: `${URL_API_CORE}/users`,
    data: {
      userlandId: ''
    },
    ...configs.noAuth
  })
    .then(response => {
      expect(response.status).toBe(400)
      expect(response.data.message).toBe('this would not get created (userlandId is not valid)')
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
      expect(response.data.name).toBe(`Xxx${id}`)
      expect(typeof response.data.modules.find(m => m.id === 'free')).toBe('object')
      expect(typeof response.data.modules.find(m => m.id === 'pro')).toBe('object')
      configs.auth.auth.password = response.data.password
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
      expect(response.data.name).toBe(`Xxx${id}`)
      return done()
    })
    .catch(done)
})
  
test('doesnt get a user that doesnt exist', (done) => {
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

// doesnt work due to skipPasswordCheck and NODE_ENV local
// test('doesnt get a user that has a bad password', (done) => {
//   axios({
//     method: 'get',
//     url: `${URL_API_CORE}/me`,
//     validateStatus: false,
//     auth: {
//       username: configs.auth.auth.username,
//       password: 'random password'
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
