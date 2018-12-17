import debounce from 'debounce'
import api from '../../../api'
import getProjects from './get'

const patch = debounce((projectId, payload) => {
  api.patch('api-core', `me/team/projects/${projectId}`, payload)
}, 200)

export default async function (state, payload) {
  patch(payload.id, payload)
  let { projects } = await getProjects(state)
  if (state.currentProject !== null && state.currentProject.project.id === payload.id) {
    state.currentProject.project.fromApiPatch(payload)
  }
  projects = projects.map(p => {
    if (p.project.id === payload.id) {
      p.project.fromApiPatch(payload)
    }
    return p
  })
  const currentProject = (() => {
    if (state.currentProject === null) {
      return null
    }
    return projects.find(p => p.project.id === state.currentProject.project.id) || null
  })()
  return Promise.resolve({
    ...state,
    projects,
    currentProject
  })
}
