import api from '../../api.js'
import classes from '../../../classes'
import getProjects from './get'

export default async function (state, { id, name }) {
  let { projects } = await getProjects(state)
  return api.patch('api-core', `me/team/projects/${id}`, { name })
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
