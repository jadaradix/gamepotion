const axios = require('axios')
const createRandomString = require('../abstractions/createRandomString.js')

const URL_API_CORE = 'http://localhost:1025/v1'

const user = {
  userlandId: `${createRandomString()}@gamemaker.club`
}

const team = {
  name: 'Invisionsoft'
}

const configs = {
  auth: {
    validateStatus: false,
    auth: {
      username: user.userlandId
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
      user.id = response.data.id
      configs.auth.auth.password = response.data.password
      return done()
    })
    .catch(done)
})

test('doesnt create a team with a bad name (class testing)', (done) => {
  axios({
    method: 'post',
    url: `${URL_API_CORE}/teams`,
    data: {
      name: ''
    },
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(400)
      expect(response.data.message).toBe('this would not get created (name is not valid)')
      return done()
    })
    .catch(done)
})

test('creates a team', (done) => {
  axios({
    method: 'post',
    url: `${URL_API_CORE}/teams`,
    data: team,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(201)
      expect(response.data.name).toBe(team.name)
      team.id = response.data.id
      return done()
    })
    .catch(done)
})

test('doesnt get the team', (done) => {
  axios({
    method: 'get',
    url: `${URL_API_CORE}/me/team`,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(404)
      expect(response.data.message).toBe('not part of a team')
      return done()
    })
    .catch(done)
})

test('doesnt get the teams users', (done) => {
  axios({
    method: 'get',
    url: `${URL_API_CORE}/me/team/users`,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(404)
      expect(response.data.message).toBe('not part of a team')
      return done()
    })
    .catch(done)
})

test('updates the users team', (done) => {
  axios({
    method: 'patch',
    url: `${URL_API_CORE}/me`,
    data: {
      teamId: team.id
    },
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data.teamId).toBe(team.id)
      return done()
    })
    .catch(done)
})

test('gets the team', (done) => {
  axios({
    method: 'get',
    url: `${URL_API_CORE}/me/team`,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data.name).toBe(team.name)
      return done()
    })
    .catch(done)
})

test('gets the teams users', (done) => {
  axios({
    method: 'get',
    url: `${URL_API_CORE}/me/team/users`,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data).toHaveLength(1)
      expect(Object.keys(response.data[0])).toHaveLength(3)
      expect(response.data[0].id).toBe(user.id)
      return done()
    })
    .catch(done)
})

test('updates the team', (done) => {
  axios({
    method: 'patch',
    url: `${URL_API_CORE}/me/team`,
    data: {
      name: 'FatQuack'
    },
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data.name).toBe('FatQuack')
      team.name = 'FatQuack'
      return done()
    })
    .catch(done)
})

test('gets the team (update persisted)', (done) => {
  axios({
    method: 'get',
    url: `${URL_API_CORE}/me/team`,
    ...configs.auth
  })
    .then(response => {
      expect(response.data.name).toBe('FatQuack')
      expect(response.status).toBe(200)
      return done()
    })
    .catch(done)
})

test('deletes the team', (done) => {
  axios({
    method: 'delete',
    url: `${URL_API_CORE}/me/team`,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(204)
      return done()
    })
    .catch(done)
})

test('doesnt get the team after deletion', (done) => {
  axios({
    method: 'get',
    url: `${URL_API_CORE}/me/team`,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(404)
      return done()
    })
    .catch(done)
})

test('doesnt get the teams users after deletion', (done) => {
  axios({
    method: 'get',
    url: `${URL_API_CORE}/me/team/users`,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(404)
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
