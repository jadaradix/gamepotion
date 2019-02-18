import api from '../../../../api'
import classes from '../../../../classes'

export default function (state) {
  if (Array.isArray(state.teamUsers)) {
    return Promise.resolve(state)
  }
  return api
    .get('api-core', 'me/team/users')
    .then(teamUsers => {
      return {
        ...state,
        teamUsers: teamUsers.map(tu => {
          const userClass = new classes.User()
          userClass.clientFromApiGet(tu)
          return userClass
        })
      }
    })
}
