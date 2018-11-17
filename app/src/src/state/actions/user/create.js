import api from '../../api.js'
import classes from '../../../classes'

import updateUser from './update'

const doCreateUser = (payload) => {
  return api.createUser(payload)
}

const doCreateTeam = () => {
  return api.post('api-core', 'teams', {})
    .then(team => {
      const teamClass = new classes.Team()
      teamClass.clientFromApiGet(team)
      return teamClass
    })
}

export default async function (state, payload) {
  const userClass = await (async () => {
    const user = await doCreateUser(payload)
    const userClass = new classes.User()
    userClass.clientFromApiGet(user)
    return userClass
  })()
  const teamClass = await (async () => {
    const team = await doCreateTeam()
    const teamClass = new classes.Team()
    teamClass.clientFromApiGet(team)
    return teamClass
  })()
  let newState = {
    ...state,
    user: userClass,
    team: teamClass
  }
  newState = {...await updateUser(newState, { teamId: teamClass.id })}
  return {
    ...newState
  }
}
