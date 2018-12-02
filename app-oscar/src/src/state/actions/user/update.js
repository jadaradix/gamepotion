import debounce from 'debounce'
import api from '../../../api'
import { set } from '../../../localStorage'
import notify from '../../../notify.js'

const patchLogic = (payload) => api.patch('api-core', 'me', payload)
const patch = debounce(payload => patchLogic(payload), 200)

export default async function (state, payload) {
  const credentials = {
    ...state.credentials
  }
  if (typeof payload.name === 'string') {
    patch(payload)
    const user = state.user
    user.fromApiPatch(payload)
    return {
      ...state,
      user
    }
  }
  if (typeof payload.teamId === 'string') {
    return patchLogic(payload)
      .then(() => {
        const user = state.user
        user.fromApiPatch(payload)
        return {
          ...state,
          user
        }
      })
  }
  if (typeof payload.userlandId === 'string') {
    return patchLogic(payload)
      .then(() => {
        credentials.userlandId = payload.userlandId
        set('credentials-userlandId', credentials.userlandId)
        if (payload.userlandId.indexOf('@') > 0) {
          notify.good('Your e-mail has been changed.')
        }
        const user = state.user
        user.fromApiPatch(payload)
        return {
          ...state,
          user
        }
      })
  }
  if (typeof payload.password === 'string') {
    return patchLogic(payload)
      .then(() => {
        credentials.password = payload.password
        set('credentials-password', credentials.password)
        notify.good('Your password has been changed.')
        const user = state.user
        user.fromApiPatch(payload)
        return {
          ...state,
          user
        }
      })
  }

}
