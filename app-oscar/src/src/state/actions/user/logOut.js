import api from '../../api.js'
import { set } from '../../../localStorage'

export default function (state, { email, password }) {
  api.logOut(email, password)
  const credentials = {
    ...state.credentials,
    password: ''
  }
  set('credentials-email', credentials.email)
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
