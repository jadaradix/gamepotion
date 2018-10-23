import getProjects from './actions/projects/get'
import createProject from './actions/projects/create'
import deleteProject from './actions/projects/delete'
import loadProject from './actions/projects/load'

let state = {
  projects: null,
  currentProject: null
}

const actions = (() => {
  const actions = new Map()
  actions.set('PROJECTS_GET', getProjects)
  actions.set('PROJECTS_CREATE', createProject)
  actions.set('PROJECTS_DELETE', deleteProject)
  actions.set('PROJECTS_LOAD', loadProject)
  return actions
})()

const dispatched = []

export default function dispatch ({ name, data = {} }) {
  const foundAction = actions.get(name)
  if (foundAction === undefined) {
    return Promise.reject(`[state] action ${name} is not understood!`)
  }
  dispatched.push(dispatched)
  return foundAction(state, data)
    .then(newState => {
      state = newState
      return state
    })
    .catch(error => {
      throw new Error('[state] action execution failed!', error)
    })
}
