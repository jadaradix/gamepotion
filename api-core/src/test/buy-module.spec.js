const axios = require('axios')
const { setup, teardown } = require('./setup-teardown')

let testData

beforeAll(async () => {
  testData = await setup()
})

afterAll(async () => {
  await teardown(testData)
})

let transactionId
test('creates a transaction', () => {
  return axios({
    method: 'post',
    data: {
      moduleId: 'pro',
      total: 1000,
    },
    url: `${testData.URL_API_CORE}/me/transactions`,
    ...testData.configs.auth
  })
    .then(response => {
      transactionId = response.data.id
      expect(response.status).toBe(201)
      expect(response.data.state).toBe('UNPAID')
    })
})

test('doesnt call back when there is no id', () => {
  return axios({
    method: 'post',
    data: {
      client_reference_id: undefined
    },
    url: `${testData.URL_API_CORE}/stripe-callback`,
    ...testData.configs.noAuth
  })
    .then(response => {
      expect(response.data.message).toBe('couldnt update transaction; client_reference_id is not a string')
      expect(response.status).toBe(400)
    })
})

test('doesnt call back when the transaction doesnt exist', () => {
  return axios({
    method: 'post',
    data: {
      client_reference_id: 'xyz'
    },
    url: `${testData.URL_API_CORE}/stripe-callback`,
    ...testData.configs.noAuth
  })
    .then(response => {
      expect(response.data.message).toBe('couldnt update transaction; couldnt find Transactions')
      expect(response.status).toBe(400)
    })
})

test('calls back', () => {
  return axios({
    method: 'post',
    data: {
      client_reference_id: transactionId
    },
    url: `${testData.URL_API_CORE}/stripe-callback`,
    ...testData.configs.noAuth
  })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.data).toBe('stripe-callback:PAID')
    })
})

test('doesnt delete a transaction that doesnt exist', () => {
  return axios({
    method: 'delete',
    url: `${testData.URL_API_CORE}/me/transactions/xyz`,
    ...testData.configs.auth
  })
    .then(response => {
      expect(response.status).toBe(404)
    })
})

test('deletes the transaction', () => {
  return axios({
    method: 'delete',
    url: `${testData.URL_API_CORE}/me/transactions/${transactionId}`,
    ...testData.configs.auth
  })
    .then(response => {
      expect(response.status).toBe(204)
    })
})
