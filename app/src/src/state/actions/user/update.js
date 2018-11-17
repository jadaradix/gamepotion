import api from '../../api.js'
import classes from '../../../classes'

export default async function (state, payload) {
  return api.patch('api-core', 'me', payload)
    .then(project => {
      const userClass = new classes.User()
      userClass.clientFromApiGet(project)
      return {
        ...state,
        user: userClass
      }
    })
}
