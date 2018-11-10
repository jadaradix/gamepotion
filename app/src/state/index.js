import notify from '../notify.js'

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

const actions = new Map([
  ['USER_LOG_IN', logIn],
  ['USER_LOG_OUT', logOut],
  ['PROJECTS_CREATE', createProject],
  ['PROJECTS_GET', getProjects],
  ['PROJECTS_UPDATE', updateProject],
  ['PROJECTS_DELETE', deleteProject],
  ['PROJECTS_START_LOAD', startLoadProject],
  ['PROJECTS_LOAD', loadProject],
  ['PROJECTS_RESOURCES_CREATE', createProjectResource],
  ['PROJECTS_RESOURCES_LOAD', loadProjectResource],
  ['PROJECTS_RESOURCES_UPDATE', updateProjectResource],
  ['PROJECTS_RESOURCES_DELETE', deleteProjectResource]
])

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
      console.error('[state] action execution failed!', error)
      const errorMessage = (() => {
        if (error.message === 'Network Error') {
          return 'Our API looks to be down. Are you connected to the Internet?'
        } else if (error.hasOwnProperty('response')) {
          return `That didn&rsquo;t work (${error.response.data.message}). Please try again.`
        } else {
          return 'That didn&rsquo;t work. That&rsquo;s all we know. Please try again later.'
        }
      })()
      notify.bad(errorMessage)
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
