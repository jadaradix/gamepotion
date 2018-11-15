import api from '../../api.js'
import getProjects from './get'

export default async function (state, { id }) {
  let { projects } = await getProjects(state)
  return api.del('api-core', `me/team/projects/${id}`)
    .then(() => {
      projects = (() => {
        return projects.filter(project => {
          return (project.project.id !== id)
        })
      })()
      const currentProject = (() => {
        if (state.currentProject === null) {
          return state.currentProject
        }
        if (state.currentProject.project.id === id) {
          return null
        }
        return state.currentProject
      })()
      return {
        ...state,
        projects,
        currentProject
      }
    })
}
