import debounce from 'debounce'
import api from '../../../api'

const patchLogic = (payload) => api.patch('api-core', 'me/team', payload)
const patch = debounce(payload => patchLogic(payload), 200)

export default async function (state, payload) {
  patch(payload)
  const team = state.team
  team.fromApiPatch(payload)
  return {
    ...state,
    team
  }
}
