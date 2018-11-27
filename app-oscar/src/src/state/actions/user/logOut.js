import api from '../../../api'
import { set } from '../../../localStorage'

export default function (state) {
  api.logOut()
  const credentials = {
    ...state.credentials,
    password: ''
  }
  set('credentials-password', credentials.password)
  return Promise.resolve({
    ...state,
    credentials,
    user: null,
    team: null,
    projects: null,
    currentProject: null
  })
}
