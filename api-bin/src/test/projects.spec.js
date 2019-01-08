const axios = require('axios')
const createRandomString = require('../abstractions/createRandomString.js')

const URL_API_CORE = 'http://localhost:1025/v1'
const URL_API_BIN = 'http://localhost:1026/v1'

const user = {
  userlandId: `${createRandomString()}@example.com`
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

describe('resources', () => {
  let resourceImageId
  it('adds an image resource', (done) => {
    axios({
      method: 'post',
      url: `${URL_API_CORE}/me/team/projects/${project.id}/resources`,
      data: {
        type: 'image',
        name: 'Bird Image'
      },
      ...configs.auth
    })
      .then(response => {
        expect(response.status).toBe(201)
        resourceImageId = response.data.id
        return done()
      })
      .catch(done)
  })

  it('throws a wobbler when updating a resource if there is no bin file key', (done) => {
    axios.post(
      `${URL_API_BIN}/me/team/projects/${project.id}/resources/${resourceImageId}`,
      {},
      {
        ...configs.auth
      }
    )
      .then(response => {
        expect(response.status).toBe(400)
        expect(response.data.message).toBe('no bin file key')
        return done()
      })
      .catch(done)
  })

  it('deletes the image resource', (done) => {
    axios({
      method: 'delete',
      url: `${URL_API_CORE}/me/team/projects/${project.id}/resources/${resourceImageId}`,
      ...configs.auth
    })
      .then(response => {
        expect(response.status).toBe(204)
        return done()
      })
      .catch(done)
  })
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
