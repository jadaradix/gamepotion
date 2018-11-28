import debounce from 'debounce'
import api from '../../../api'

const patch = debounce((projectId, payload) => {
  api.patch('api-core', `me/team/projects/${projectId}`, payload)
}, 200)

export default async function (state, payload) {
  patch(payload.id, payload)
  const currentProject = state.currentProject
  currentProject.project.fromApiPatch(payload)
  return {
    ...state,
    currentProject
  }
}
