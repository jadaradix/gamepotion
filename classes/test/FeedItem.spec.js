const FeedItem = require('../dist/FeedItem.js').default

test('can be created', () => {
  const team = new FeedItem()
  expect(typeof team.id).toBe('string')
  expect(typeof team.createdAt).toBe('number')
  expect(typeof team.title).toBe('string')
  expect(typeof team.content).toBe('string')
})

test('can be created from an API call', () => {
  const team = new FeedItem()
  const body = {
    title: 'Good news'
  }
  team.fromApiPost(body)
  expect(team.title).toBe('Good news')
})

test('throws an error when being created from an API call if there is an empty title', () => {
  const team = new FeedItem()
  const body = {
    title: ''
  }
  expect(() => team.fromApiPost(body)).toThrow('title is not valid')
})

test('can be updated from an API call', () => {
  const team = new FeedItem()
  team.title = 'Bad news'
  const body = {
    title: 'Good news',
    id: 'xyz'
  }
  team.fromApiPatch(body)
  expect(team.id).not.toBe('xyz')
  expect(team.title).not.toBe('Bad news')
  expect(team.title).toBe('Good news')
})
