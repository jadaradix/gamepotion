import api from '../../api.js'
import classes from '../../../classes'
import getProjects from './get'

export default async function (state, payload) {
  const {
    id
  } = payload
  let { projects } = await getProjects(state)
  return api.patch('api-core', `me/team/projects/${id}`, payload)
    .then(project => {
      const projectClass = new classes.Project()
      projectClass.clientFromApiGet(project)
      projects = (() => {
        return projects.map(project => {
          if (project.project.id === id) {
            project.project = projectClass
          }
          return project
        })
      })()
      let currentProject = state.currentProject
      if (currentProject !== null && currentProject.project.id === id) {
        currentProject.project = projectClass
      }
      return {
        ...state,
        projects,
        currentProject
      }
    })
}
