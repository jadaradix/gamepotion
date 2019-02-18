import api from '../../../api'
import classes from '../../../classes'

export default function (state) {

  const {
    userlandId,
    password
  } = state.credentials

  return api.logIn(userlandId, password)
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
}
