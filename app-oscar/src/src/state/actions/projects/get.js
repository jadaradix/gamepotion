import api from '../../api.js'
import classes from '../../../classes'

export default function (state) {
  if (Array.isArray(state.projects)) {
    return Promise.resolve(state)
  }
  return api
    .get('api-core', 'me/team/projects')
    .then(projects => {
      projects = projects.map(project => {
        const projectClass = new classes.Project()
        projectClass.clientFromApiGet(project)
        return {
          project: projectClass,
          resources: null,
          currentResource: null
        }
      })
      const currentProject = (() => {
        // this is some auto load logic; it seems bad?
        if (state.currentProject === null) {
          return null
        } else {
          const foundCurrentProject = projects.find(project => project.project.id === state.currentProject.project.id)
          return foundCurrentProject || null
        }
      })()
      return {
        ...state,
        projects,
        currentProject
      }
    })
}
