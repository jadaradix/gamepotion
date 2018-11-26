import debounce from 'debounce'
import api from '../../api.js'
import { set } from '../../../localStorage'

const patch = debounce((payload) => {
  api.patch('api-core', 'me', payload)
}, 200)

export default async function (state, payload) {
  patch(payload)
  const credentials = {
    ...state.credentials
  }
  if (typeof payload.userlandId === 'string') {
    credentials.userlandId = payload.userlandId
    set('credentials-userlandId', credentials.userlandId)
  }
  if (typeof payload.password === 'string') {
    credentials.password = payload.password
    set('credentials-password', credentials.password)
  }
  const user = state.user
  user.fromApiPatch(payload)
  return {
    ...state,
    user
  }
}
