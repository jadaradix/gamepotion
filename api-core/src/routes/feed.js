const classes = require('../classes/dist.js')

const feedItems = [
  new classes.FeedItem({
    title: 'Good news'
  }),
  new classes.FeedItem({
    title: 'Bad news'
  })
]
const feedItemApis = feedItems.map(fi => fi.toApi())

const route = (request, response, next) => {
  response.send(feedItemApis)
  return next()
}

module.exports = route
