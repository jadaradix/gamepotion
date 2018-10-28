import logIn from './actions/user/logIn'
import logOut from './actions/user/logOut'
import createProject from './actions/projects/create'
import getProjects from './actions/projects/get'
import updateProject from './actions/projects/update'
import deleteProject from './actions/projects/delete'
import startLoadProject from './actions/projects/startLoad'
import loadProject from './actions/projects/load'
import loadProjectResource from './actions/projects/resources/load'
import createProjectResource from './actions/projects/resources/create'
import updateProjectResource from './actions/projects/resources/update'
import deleteProjectResource from './actions/projects/resources/delete'

let state = {
  user: null,
  team: null,
  projects: null,
  currentProject: null
}

const actions = (() => {
  const actions = new Map()
  actions.set('USER_LOG_IN', logIn)
  actions.set('USER_LOG_OUT', logOut)
  actions.set('PROJECTS_CREATE', createProject)
  actions.set('PROJECTS_GET', getProjects)
  actions.set('PROJECTS_UPDATE', updateProject)
  actions.set('PROJECTS_DELETE', deleteProject)
  actions.set('PROJECTS_START_LOAD', startLoadProject)
  actions.set('PROJECTS_LOAD', loadProject)
  actions.set('PROJECTS_RESOURCES_CREATE', createProjectResource)
  actions.set('PROJECTS_RESOURCES_LOAD', loadProjectResource)
  actions.set('PROJECTS_RESOURCES_UPDATE', updateProjectResource)
  actions.set('PROJECTS_RESOURCES_DELETE', deleteProjectResource)
  return actions
})()

const element = document.createElement('SPAN')
// (() => {
//   // ELECTRON
//   if (window.require && window.process && typeof window.process.versions['electron'] === 'string') {
//     const electron = window.require('electron') // webpack is trying to understand this!!!
//     electron.ipcRenderer.on('incoming-play-pause', event => {
//       console.warn('[service pubsub] incoming-play-pause')
//       this.publish('player-user-play-pause')
//     })
//     electron.ipcRenderer.on('incoming-next', event => {
//       console.warn('[service pubsub] incoming-next')
//       this.publish('player-next')
//     })
//   }
//   // ...
// })()

const dispatched = []

export function dispatch ({ name, data = {} }) {
  const foundAction = actions.get(name)
  if (foundAction === undefined) {
    return Promise.reject(`[state] action ${name} is not understood!`)
  }
  dispatched.push(dispatched)
  return foundAction(state, data)
    .then(newState => {
      state = newState
      publish(name, state)
      return state
    })
    .catch(error => {
      throw new Error('[state] action execution failed!', error)
    })
}

export function publish (name, detail) {
  console.log('[state] [publish]', name)
  element.dispatchEvent(new window.CustomEvent(`gmc-pub-sub-event-${name}`, { detail }))
}

export function getState () {
  return state
}

export function subscribe (name, handler) {
  const logic = e => handler(e.detail)
  element.addEventListener(`gmc-pub-sub-event-${name}`, logic, false)
  return {
    unsubscribe: () => element.removeEventListener(`gmc-pub-sub-event-${name}`, logic)
  }
}
