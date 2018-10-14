const errors = require('restify-errors')
const datalayer = require('../../../abstractions/datalayer')
const classes = require('../../../classes/dist.js')

const route = (request, response, next) => {
  let teamClass
  try {
    teamClass = new classes.Team()
    teamClass.fromApiPost(request.body)
  } catch (error) {
    response.send(new errors.BadRequestError(`this team would not get created (${error.message})`))
    return next(false)
  }
  datalayer.write('Teams', teamClass.id, teamClass.toDatastore())
    .then(() => {
      response.send(teamClass.toApi())
      return next()
    })
    .catch(error => {
      console.error('[route users teams create] datalayer.write caught', error)
      response.send(new errors.InternalServerError('couldnt create team'))
      return next(false)
    })
}

module.exports = route
