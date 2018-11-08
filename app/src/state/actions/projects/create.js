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
    .catch(error => {
      if (error.message === 'Network Error') {
        throw new Error('Our API looks to be down. Are you connected to the Internet?')
      } else {
        throw new Error('That didn&rsquo;t work. Please try again.')
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
