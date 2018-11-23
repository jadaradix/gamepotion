const FeedItem = require('../dist/FeedItem.js')

test('can be created', () => {
  const feedItem = new FeedItem({
    feedId: 'news'
  })
  expect(typeof feedItem.id).toBe('string')
  expect(typeof feedItem.feedId).toBe('string')
  expect(typeof feedItem.createdAt).toBe('number')
  expect(typeof feedItem.title).toBe('string')
  expect(typeof feedItem.content).toBe('string')
})

test('can be created from an API call', () => {
  const feedItem = new FeedItem()
  const body = {
    feedId: 'news',
    title: 'Good news',
    content: 'Good news.'
  }
  feedItem.fromApiPost(body)
  expect(feedItem.title).toBe('Good news')
})

test('throws an error when being created from an API call if there is an empty title', () => {
  const feedItem = new FeedItem()
  const body = {
    feedId: 'news',
    title: '',
    content: 'blah blah'
  }
  expect(() => feedItem.fromApiPost(body)).toThrow('title is not valid')
})

test('throws an error when being created from an API call if there is empty content', () => {
  const feedItem = new FeedItem()
  const body = {
    feedId: 'news',
    title: 'blah blah',
    content: ''
  }
  expect(() => feedItem.fromApiPost(body)).toThrow('content is not valid')
})

test('can be updated from an API call', () => {
  const feedItem = new FeedItem()
  feedItem.feedId = 'news'
  feedItem.title = 'Bad news'
  feedItem.content = 'Bad news.'
  const body = {
    title: 'Good news',
    content: 'Good news.',
    id: 'xyz',
    feedId: 'xyz'
  }
  feedItem.fromApiPatch(body)
  expect(feedItem.id).not.toBe('xyz')
  expect(feedItem.feedId).not.toBe('xyz')
  expect(feedItem.title).toBe('Good news')
  expect(feedItem.content).toBe('Good news.')
})
