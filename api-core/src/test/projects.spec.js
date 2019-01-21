/**
 * @jest-environment node
 */

const axios = require('axios')
const { setup, teardown } = require('./setup-teardown')

let testData

beforeAll(async () => {
  testData = await setup()
})

afterAll(async () => {
  if (typeof testData !== 'object') {
    throw new Error('setup failed so teardown will not work')
  }
  await teardown(testData)
})

test('updates a project', (done) => {
  axios({
    method: 'patch',
    url: `${testData.URL_API_CORE}/me/team/projects/${testData.project.id}`,
    data: {
      name: 'DinoRun'
    },
    ...testData.configs.auth
  })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data.name).toBe('DinoRun')
      testData.project.name = response.data.name
      return done()
    })
    .catch(done)
})

test('lists the project', (done) => {
  axios({
    method: 'get',
    url: `${testData.URL_API_CORE}/me/team/projects`,
    ...testData.configs.auth
  })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data).toHaveLength(1)
      const foundProject = response.data.find(p => p.id === testData.project.id)
      expect(typeof foundProject).toBe('object')
      return done()
    })
    .catch(done)
})

describe('resources', () => {
  test('lists none', (done) => {
    axios({
      method: 'get',
      url: `${testData.URL_API_CORE}/me/team/projects/${testData.project.id}/resources`,
      ...testData.configs.auth
    })
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.data).toHaveLength(0)
        return done()
      })
      .catch(done)
  })

  test('doesnt add one with a stupid type', (done) => {
    axios({
      method: 'post',
      url: `${testData.URL_API_CORE}/me/team/projects/${testData.project.id}/resources`,
      data: {
        type: 'qweqweqwe'
      },
      ...testData.configs.auth
    })
      .then(response => {
        expect(response.status).toBe(400)
        expect(response.data.message).toBe('this would not get created ([classes.factory] [resource] i dont understand resource type \'qweqweqwe\')')
        return done()
      })
      .catch(done)
  })

  let resourceId
  test('adds one', (done) => {
    axios({
      method: 'post',
      url: `${testData.URL_API_CORE}/me/team/projects/${testData.project.id}/resources`,
      data: {
        type: 'sound',
        name: 'Bird Sound'
      },
      ...testData.configs.auth
    })
      .then(response => {
        expect(response.status).toBe(201)
        expect(response.data.type).toBe('sound')
        expect(response.data.name).toBe('Bird Sound')
        resourceId = response.data.id
        return done()
      })
      .catch(done)
  })

  test('lists one', (done) => {
    axios({
      method: 'get',
      url: `${testData.URL_API_CORE}/me/team/projects/${testData.project.id}/resources`,
      ...testData.configs.auth
    })
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.data).toHaveLength(1)
        const foundResource = response.data.find(r => r.id === resourceId)
        expect(typeof foundResource).toBe('object')
        return done()
      })
      .catch(done)
  })

  test('renames it', (done) => {
    axios({
      method: 'patch',
      url: `${testData.URL_API_CORE}/me/team/projects/${testData.project.id}/resources/${resourceId}`,
      data: {
        type: 'stoopid-type',
        name: 'Fox Sound'
      },
      ...testData.configs.auth
    })
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.data.type).toBe('sound')
        expect(response.data.name).toBe('Fox Sound')
        return done()
      })
      .catch(done)
  })

  test('deletes it', (done) => {
    axios({
      method: 'delete',
      url: `${testData.URL_API_CORE}/me/team/projects/${testData.project.id}/resources/${resourceId}`,
      ...testData.configs.auth
    })
      .then(response => {
        expect(response.status).toBe(204)
        return done()
      })
      .catch(done)
  })

  test('lists none after deletion', (done) => {
    axios({
      method: 'get',
      url: `${testData.URL_API_CORE}/me/team/projects/${testData.project.id}/resources`,
      ...testData.configs.auth
    })
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.data).toHaveLength(0)
        return done()
      })
      .catch(done)
  })
})

test('deletes the project', (done) => {
  axios({
    method: 'delete',
    url: `${testData.URL_API_CORE}/me/team/projects/${testData.project.id}`,
    ...testData.configs.auth
  })
    .then(response => {
      expect(response.status).toBe(204)
      return done()
    })
    .catch(done)
})
