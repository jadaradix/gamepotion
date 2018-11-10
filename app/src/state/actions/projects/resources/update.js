import debounce from 'debounce'
import api from '../../../api.js'

const patch = debounce((projectId, data) => {
  api.patch('api-core', `me/team/projects/${projectId}/resources/${data.id}`, data)
}, 500)

export default async function (state, data) {
  patch(state.currentProject.project.id, data)
  const currentProject = state.currentProject
  const resourceClass = currentProject.resources.find(r => r.id === data.id)
  resourceClass.fromApiPatch(data)
  return Promise.resolve({
    ...state,
    currentProject
  })
}
