const axios = require('axios')
const createRandomString = require('../abstractions/createRandomString.js')

const URL_API_CORE = 'http://localhost:1025/v1'

const user = {
  userlandId: `${createRandomString()}@gamemaker.club`
}

const team = {
  name: 'FatQuack'
}

const project = {
  name: 'Aggressive Avians'
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

test('creates a project', (done) => {
  axios({
    method: 'post',
    url: `${URL_API_CORE}/me/team/projects`,
    data: project,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(201)
      expect(response.data.name).toBe(project.name)
      project.id = response.data.id
      return done()
    })
    .catch(done)
})

test('doesnt play a project that doesnt exist', (done) => {
  axios({
    method: 'get',
    url: `${URL_API_CORE}/public-projects/xyz/play`,
    ...configs.noAuth
  })
    .then(response => {
      expect(response.status).toBe(404)
      return done()
    })
    .catch(done)
})

test('plays the project', (done) => {
  axios({
    method: 'get',
    url: `${URL_API_CORE}/public-projects/${project.id}/play`,
    ...configs.noAuth
  })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data.project.name).toBe(project.name)
      expect(Array.isArray(response.data.resources)).toBe(true)
      return done()
    })
    .catch(done)
})

test('deletes the project', (done) => {
  axios({
    method: 'delete',
    url: `${URL_API_CORE}/me/team/projects/${project.id}`,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(204)
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
