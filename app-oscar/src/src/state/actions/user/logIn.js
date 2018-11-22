import api from '../../api.js'
import classes from '../../../classes'
import { set } from '../../../localStorage'

export default function (state, { userlandId, password }) {
  return api.logIn(userlandId, password)
    .then(({user, team}) => {
      const userClass = new classes.User()
      userClass.clientFromApiGet(user)
      const teamClass = new classes.Team()
      teamClass.clientFromApiGet(team)
      set('credentials-userlandId', userlandId)
      set('credentials-password', password)
      return {
        ...state,
        credentials: {
          userlandId,
          password
        },
        user: userClass,
        team: teamClass
      }
    })
}
