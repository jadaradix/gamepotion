import debounce from 'debounce'
import api from '../../../api'

const patchLogic = (payload) => api.patch('api-core', 'me/team', payload)
const patch = debounce(payload => patchLogic(payload), 200)

export default async function (state, payload) {
  if (payload.name.length === 0) {
    state.team.name = payload.name
    return {
      ...state
    }
  }
  patch(payload)
  state.team.fromApiPatch(payload)
  return {
    ...state
  }
}
