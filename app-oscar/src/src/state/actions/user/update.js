import debounce from 'debounce'
import api from '../../api.js'
import classes from '../../../classes'
import { set } from '../../../localStorage'

const patch = debounce((payload) => {
  api.patch('api-core', 'me', payload)
}, 200)

export default async function (state, payload) {
  patch(payload)
  const user = state.user
  user.fromApiPatch(payload)
  const credentials = {
    ...state.credentials
  }
  if (typeof payload.userlandId === 'string') {
    credentials.userlandId = payload.userlandId
  }
  if (typeof payload.password === 'string') {
    credentials.password = payload.password
  }
  set('credentials-userlandId', credentials.userlandId)
  set('credentials-password', credentials.password)
  return {
    ...state,
    user
  }
}
