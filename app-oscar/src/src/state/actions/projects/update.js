import debounce from 'debounce'
import api from '../../api.js'

const patch = debounce((projectId, payload) => {
  api.patch('api-core', `me/team/projects/${projectId}`, payload)
}, 500)

export default async function (state, payload) {
  const {
    id
  } = payload
  patch(id, payload)
  const currentProject = state.currentProject
  currentProject.project.fromApiPatch(payload)
  return {
    ...state,
    currentProject
  }
}
