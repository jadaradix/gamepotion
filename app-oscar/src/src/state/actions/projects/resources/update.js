import debounce from 'debounce'
import api from '../../../api.js'

const patch = debounce((projectId, payload) => {
  api.patch('api-core', `me/team/projects/${projectId}/resources/${payload.id}`, payload)
}, 200)

export default async function (state, payload) {
  patch(state.currentProject.project.id, payload)
  const currentProject = state.currentProject
  const resourceClass = currentProject.resources.find(r => r.id === payload.id)
  resourceClass.fromApiPatch(payload)
  return Promise.resolve({
    ...state,
    resourceClass
  })
}
