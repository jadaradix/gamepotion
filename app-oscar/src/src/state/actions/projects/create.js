import api from '../../../api'
import classes from '../../../classes'

import getProjects from './get'
import updateProject from './update'
import createResource from './resources/create'

const doCreateResource = async (state, type) => {
  return await createResource(state, { type })
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
  newState = {...await doCreateResource(newState, 'atom')}
  newState = {...await doCreateResource(newState, 'space')}
  const foundNewSpace = newState.currentProject.resources.find(r => r.type === 'space')
  newState = {...await updateProject(newState, { id: newState.currentProject.project.id, startSpace: foundNewSpace.id })}
  return {
    ...newState
  }
}
