import debounce from 'debounce'
import api from '../../../api'

const patch = debounce((projectId, payload) => {
  api.patch('api-core', `me/team/projects/${projectId}`, payload)
}, 200)

export default async function (state, payload) {
  patch(payload.id, payload)
  return Promise.resolve({
    ...state,
    projects: state.projects.map(p => {
      if (p.project.id === payload.id) {
        p.project.fromApiPatch(payload)
      }
      return p
    }),
    currentProject: (() => {
      if (state.currentProject === null) {
        return null
      }
      if (state.currentProject.project.id === payload.id) {
        state.currentProject.project.fromApiPatch(payload)
      }
      return state.currentProject
    })()
  })
}
