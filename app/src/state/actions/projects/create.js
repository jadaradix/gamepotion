import api from '../../api.js'
import classes from '../../../classes'
import getProjects from './get'
import createResource from './resources/create'

const doCreateResource = async (state) => {
  return await createResource(state, { type: 'space' })
}

const doCreateProject = async (state, name) => {
  return api.post('api-core', 'me/team/projects', { name })
    .then(project => {
      const projectClass = new classes.Project()
      projectClass.clientFromApiGet(project)
      const currentProject = {
        project: projectClass,
        resources: null,
        currentResource: null
      }
      state.projects.push(currentProject)
      state.currentProject = currentProject
      return {
        ...state
      }
    })
}

export default async function (state, { name }) {
  let newState = await getProjects(state) // do not remove this!!!
  newState = {...await doCreateProject(newState, name)}
  newState = {...await doCreateResource(newState)}
  return {
    ...newState
  }
}
