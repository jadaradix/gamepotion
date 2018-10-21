const axios = require('axios')
const createRandomString = require('../abstractions/createRandomString.js')

const API_URL = 'http://localhost:1025/v1'

const user = {
  name: 'James',
  email: `${createRandomString()}@gamemaker.club`,
  password: createRandomString()
}

const team = {
  name: 'FatQuack'
}

const project = {
  name: 'Angry Birds'
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
      user.id = response.data.id
      return done()
    })
    .catch(done)
})

test('creates a team', (done) => {
  axios({
    method: 'post',
    url: `${API_URL}/teams`,
    data: team,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data.name).toBe(team.name)
      team.id = response.data.id
      return done()
    })
    .catch(done)
})

test('updates the users team', (done) => {
  axios({
    method: 'patch',
    url: `${API_URL}/me`,
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
    url: `${API_URL}/me/team/projects`,
    data: project,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data.name).toBe(project.name)
      project.id = response.data.id
      return done()
    })
    .catch(done)
})

test('lists the project', (done) => {
  axios({
    method: 'get',
    url: `${API_URL}/me/team/projects`,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data).toHaveLength(1)
      const foundProject = response.data.find(p => p.id === project.id)
      expect(typeof foundProject).toBe('object')
      return done()
    })
    .catch(done)
})

test('deletes the project', (done) => {
  axios({
    method: 'delete',
    url: `${API_URL}/me/team/projects/${project.id}`,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(204)
      return done()
    })
    .catch(done)
})

test('doesnt list the project', (done) => {
  axios({
    method: 'get',
    url: `${API_URL}/me/team/projects`,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data).toHaveLength(0)
      return done()
    })
    .catch(done)
})

test('deletes the team', (done) => {
  axios({
    method: 'delete',
    url: `${API_URL}/me/team`,
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
    url: `${API_URL}/me`,
    ...configs.auth
  })
    .then(response => {
      expect(response.status).toBe(204)
      return done()
    })
    .catch(done)
})
