import debounce from 'debounce'
import api from '../../../api'
import { set } from '../../../localStorage'
import notify from '../../../notify.js'

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
    if (payload.userlandId.indexOf('@') > 0) {
      notify.good('Your e-mail has been changed.')
    }
  }
  if (typeof payload.password === 'string') {
    credentials.password = payload.password
    set('credentials-password', credentials.password)
    notify.good('Your password has been changed.')
  }
  const user = state.user
  user.fromApiPatch(payload)
  return {
    ...state,
    user
  }
}
