import api from '../../api.js'
import classes from '../../../classes'

export default function (state, { email, password }) {
  return api.logIn(email, password)
    .then(({user, team}) => {
      const userClass = new classes.User()
      userClass.clientFromApiGet(user)
      const teamClass = new classes.Team()
      teamClass.clientFromApiGet(team)
      return {
        ...state,
        user: userClass,
        team: teamClass
      }
    })
    .catch(error => {
      console.error('[logIn action] caught', error)
      return {
        ...state,
        user: null,
        team: null
      }
    })
}
