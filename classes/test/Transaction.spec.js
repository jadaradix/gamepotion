const Transaction = require('../dist/Transaction.js')

test('can be created', () => {
  const transaction = new Transaction()
  expect(typeof transaction.id).toBe('string')
})

test('can be updated from an API call', () => {
  const transaction = new Transaction()
  transaction.moduleId = 'old'
  expect(transaction.state).toBe('UNPAID')
  const body = {
    state: 'PAID',
    moduleId: 'new'
  }
  transaction.fromApiPatch(body)
  expect(transaction.state).toBe('PAID')
  expect(transaction.moduleId).toBe('old')
})
