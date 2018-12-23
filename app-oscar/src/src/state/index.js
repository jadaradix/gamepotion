import { get, getAll } from '../localStorage'

import notify from '../notify.js'

import createUser from './actions/user/create'
import getUser from './actions/user/get'
import logIn from './actions/user/logIn'
import logOut from './actions/user/logOut'
import updateUser from './actions/user/update'
import updateTeam from './actions/team/update'
import getTeamUsers from './actions/team/users/get'

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
import getFeed from './actions/feeds/get'
import localSettingsUpdate from './actions/localSettings/update'

let state = {
  credentials: {
    userlandId: get('credentials-userlandId'),
    password: get('credentials-password')
  },
  user: null,
  team: null,
  teamUsers: null,
  projects: null,
  currentProject: null,
  feeds: new Map(),
  localSettings: getAll(['credentials-userlandId', 'credentials-password'])
}

const actions = new Map([
  ['USER_CREATE', createUser],
  ['USER_GET', getUser],
  ['USER_LOG_IN', logIn],
  ['USER_LOG_OUT', logOut],
  ['USER_UPDATE', updateUser],
  ['TEAM_UPDATE', updateTeam],
  ['TEAM_USERS_GET', getTeamUsers],
  ['PROJECTS_CREATE', createProject],
  ['PROJECTS_GET', getProjects],
  ['PROJECTS_UPDATE', updateProject],
  ['PROJECTS_DELETE', deleteProject],
  ['PROJECTS_START_LOAD', startLoadProject],
  ['PROJECTS_LOAD', loadProject],
  ['PROJECTS_RESOURCES_CREATE', createProjectResource],
  ['PROJECTS_RESOURCES_LOAD', loadProjectResource],
  ['PROJECTS_RESOURCES_UPDATE', updateProjectResource],
  ['PROJECTS_RESOURCES_DELETE', deleteProjectResource],
  ['FEEDS_GET', getFeed],
  ['LOCAL_SETTINGS_UPDATE', localSettingsUpdate]
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

const AUTH_FAILED_MESSAGES = [
  'unknown e-mail address',
  'wrong password'
]

export async function dispatchMany (array) {
  for (let index = 0; index < array.length; index++) {
    try {
      state = await dispatch(array[index])
    } catch (error) {
      break
    }
  }
}

export function dispatch ({ name, pleaseThrow = false, data = {} }) {
  const foundAction = actions.get(name)
  if (foundAction === undefined) {
    return Promise.reject(`[state] action ${name} is not understood!`)
  }
  return foundAction(state, data)
    .then(newState => {
      state = newState
      publish(name, state)
      return state
    })
    .catch(error => {
      console.error('[state] action execution failed!', error)
      if (name !== 'USER_LOG_IN' && error.response && error.response.data && AUTH_FAILED_MESSAGES.includes(error.response.data.message)) {
        window.location = '/auth'
        return false
      }
      if (name === 'USER_LOG_IN' && data.password === 'dummy-password') {
        throw error
      }
      const errorMessage = (() => {
        if (error.message === 'Network Error') {
          return 'Our API looks to be down. Are you connected to the Internet?'
        } else if (error.hasOwnProperty('response')) {
          return `That didn&rsquo;t work (${error.response.data.message}). Please try again.`
        } else if (error.hasOwnProperty('message')) {
          return `That didn&rsquo;t work (${error.message}).`
        } else {
          return 'That didn&rsquo;t work. That&rsquo;s all we know. Please try again later.'
        }
      })()
      notify.bad(errorMessage)
      if (pleaseThrow === true) {
        throw error
      }
    })
}

export function publish (name, detail) {
  console.log('[state] [publish]', name)
  element.dispatchEvent(new window.CustomEvent(`oscar-pub-sub-event-${name}`, { detail }))
}

export function getState () {
  return state
}

export function subscribe (name, handler) {
  const logic = e => handler(e.detail)
  element.addEventListener(`oscar-pub-sub-event-${name}`, logic, false)
  return {
    unsubscribe: () => element.removeEventListener(`oscar-pub-sub-event-${name}`, logic)
  }
}
