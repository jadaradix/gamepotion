import debounce from 'debounce'
import api from '../../../../api'

const patchLogic = (projectId, payload) => api.patch('api-core', `me/team/projects/${projectId}/resources/${payload.id}`, payload)

const patch = debounce((projectId, payload) => patchLogic(projectId, payload), 200)

export default async function (state, payload) {
  if (payload.forceWaitForResponse) {
    return patchLogic(state.currentProject.project.id, payload)
      .then(data => {
        const resourceClass = state.currentProject.resources.find(r => r.id === payload.id)
        resourceClass.fromApiPatch(data)
        return {
          ...state
        }
      })
  }
  patch(state.currentProject.project.id, payload)
  const resourceClass = state.currentProject.resources.find(r => r.id === payload.id)
  resourceClass.fromApiPatch(payload)
  return Promise.resolve({
    ...state
  })
}
