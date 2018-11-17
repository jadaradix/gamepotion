const axios = require('axios')

const URL_API_CORE = 'http://localhost:1025/v1'
const URL_API_BIN = 'http://localhost:1026/v1'

const user = {
  email: 'j@jada.io',
  password: 'letmein'
}

const project = {
  name: 'Aggressive Avians'
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
  let resourceAtomId
  let resourceImageId
  test('adds an atom resource', (done) => {
    axios({
      method: 'post',
      url: `${URL_API_CORE}/me/team/projects/${project.id}/resources`,
      data: {
        type: 'atom',
        name: 'Bird Atom'
      },
      ...configs.auth
    })
      .then(response => {
        expect(response.status).toBe(201)
        resourceAtomId = response.data.id
        return done()
      })
      .catch(done)
  })

  test('adds an image resource', (done) => {
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

  test('throws a wobbler when updating a resource if there is no bin file key', (done) => {
    axios.post(
      `${URL_API_BIN}/me/team/projects/${project.id}/resources/${resourceAtomId}`,
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

  test('deletes the atom resource', (done) => {
    axios({
      method: 'delete',
      url: `${URL_API_CORE}/me/team/projects/${project.id}/resources/${resourceAtomId}`,
      ...configs.auth
    })
      .then(response => {
        expect(response.status).toBe(204)
        return done()
      })
      .catch(done)
  })

  test('deletes the image resource', (done) => {
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
