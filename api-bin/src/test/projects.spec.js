/**
 * @jest-environment node
 */

const axios = require('axios')
const { setup, teardown } = require('../abstractions/api/setup-teardown')

let testData
let resourceImageId

beforeAll(async () => {
  testData = await setup()
})

afterAll(async () => {
  if (typeof testData !== 'object') {
    throw new Error('setup failed so teardown will not work')
  }
  await teardown(testData)
})

const URL_API_CORE = 'http://localhost:1025/v1'
const URL_API_BIN = 'http://localhost:1026/v1'

it('adds an image resource', (done) => {
  axios({
    method: 'post',
    url: `${URL_API_CORE}/me/team/projects/${testData.project.id}/resources`,
    data: {
      type: 'image',
      name: 'Bird Image'
    },
    ...testData.configs.auth
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
    `${URL_API_BIN}/me/team/projects/${testData.project.id}/resources/${resourceImageId}`,
    {},
    {
      ...testData.configs.auth
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
    url: `${URL_API_CORE}/me/team/projects/${testData.project.id}/resources/${resourceImageId}`,
    ...testData.configs.auth
  })
    .then(response => {
      expect(response.status).toBe(204)
      return done()
    })
    .catch(done)
})
