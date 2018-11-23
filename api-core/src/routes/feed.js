const errors = require('restify-errors')
const datalayer = require('../abstractions/datalayer')
const classes = require('../classes/dist.js')

const route = (request, response, next) => {
  datalayer.read('FeedItems', {feedId: request.params.id})
    .then(async objects => {
      const cs = objects.map(o => new classes.FeedItem(o).toApi())
      response.send(cs)
      return next()
    })
    .catch((error) => {
      console.error('[route feed] datalayer.readOne caught', error)
      response.send(new errors.InternalServerError('could not load feed'))
      return next(false)
    })
}

module.exports = route
