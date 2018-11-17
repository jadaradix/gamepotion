import api from '../../api.js'
import classes from '../../../classes'
import { set } from '../../../localStorage'

export default function (state, { email, password }) {
  return api.logIn(email, password)
    .then(({user, team}) => {
      const userClass = new classes.User()
      userClass.clientFromApiGet(user)
      const teamClass = new classes.Team()
      teamClass.clientFromApiGet(team)
      set('credentials-email', email)
      set('credentials-password', password)
      return {
        ...state,
        credentials: {
          email,
          password
        },
        user: userClass,
        team: teamClass
      }
    })
}
