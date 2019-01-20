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

test('doesnt play a project that doesnt exist', () => {
  return axios({
    method: 'get',
    url: `${testData.URL_API_CORE}/public-projects/xyz/play`,
    ...testData.configs.noAuth
  })
    .then(response => {
      expect(response.status).toBe(404)
    })
})

test('plays the project', () => {
  return axios({
    method: 'get',
    url: `${testData.URL_API_CORE}/public-projects/${testData.project.id}/play`,
    ...testData.configs.noAuth
  })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data.project.name).toBe(testData.project.name)
      expect(Array.isArray(response.data.resources)).toBe(true)
    })
})
