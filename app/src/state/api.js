import axios from 'axios'
import { get, set } from '../localStorage'

const env = (window.location.protocol === 'http:' ? 'local' : 'production')
const envs = {
  'local': {
    apis: {
      'api-core': 'http://localhost:1025/v1'
    }
  },
  'production': {
    apis: {
      'api-core': 'https://api-core.gamemaker.club/v1'
    }
  }
}
const apis = envs[env].apis

const auth = {
  username: get('credentials-email'),
  password: get('credentials-password')
}

function logIn (username, password) {
  console.log('[api] [logIn]', username, password)
  const getUser = () => {
    return axios.request({
      method: 'GET',
      url: '/me',
      baseURL: apis['api-core'],
      auth: {
        username,
        password
      },
      responseType: 'json'
    })
      .then(response => response.data)
  }
  return Promise.all([
    getUser(),
    getTeam(username, password),
  ])
    .then(([user, team]) => {
      auth.username = username
      auth.password = password
      set('credentials-email', username)
      set('credentials-password', password)
      return {user, team}
    })
}

function logOut () {
  console.log('[api] [logOut]')
  const username = ''
  const password = ''
  auth.username = username
  auth.password = password
  set('credentials-email', username)
  set('credentials-password', password)
}

function isLoggedIn () {
  console.log('[api] [isLoggedIn]', auth)
  return (auth.username.length > 0 && auth.password.length > 0)
  // return new Promise(resolve => {
  //   logIn(auth.username, auth.password)
  //     .then(() => resolve(true))
  //     .catch(() => resolve(false))
  // })
}

function getTeam (username, password) {
  return axios.request({
    method: 'GET',
    url: '/me/team',
    baseURL: apis['api-core'],
    auth: {
      username,
      password
    },
    responseType: 'json'
  })
    .then(response => response.data)
}

function dGet (whichApi, url, publicContext = false) {
  console.log('[api] [dGet] whichApi/url', whichApi, url)
  console.log('[api] [dGet] publicContext', publicContext)
  const r = {
    method: 'GET',
    url,
    baseURL: apis[whichApi],
    responseType: 'json'
  }
  if (publicContext === false) {
    r['auth'] = auth
  }
  return axios.request(r)
    .then(response => response.data)
}

function post (whichApi, url, data) {
  console.log('[api] [post]', whichApi, url)
  return axios.request({
    method: 'POST',
    url,
    data,
    baseURL: apis[whichApi],
    auth,
    responseType: 'json'
  })
    .then(response => response.data)
}

function patch (whichApi, url, data) {
  console.log('[api] [patch]', whichApi, url)
  return axios.request({
    method: 'PATCH',
    url,
    data,
    baseURL: apis[whichApi],
    auth,
    responseType: 'json'
  })
    .then(response => response.data)
}

function del (whichApi, url, data) {
  console.log('[api] [del]', whichApi, url)
  return axios.request({
    method: 'DELETE',
    url,
    data,
    baseURL: apis[whichApi],
    auth,
    responseType: 'json'
  })
    .then(response => response.data)
}

export default {
  public: {
    createUser: (payload) => {
      console.log('[api] [public] [createUser]', payload)
      const createUser = () => {
        return axios.request({
          method: 'POST',
          url: '/users',
          data: payload,
          baseURL: apis['api-core'],
          responseType: 'json'
        })
          .then(response => {
            return new Promise((resolve) => {
              setTimeout(() => {
                return resolve(response.data)
              }, 500) // we dont actually need this; it was because Promise.all runs in parallel :-)
            })
          })
      }
      return createUser()
        .then(user => {
          return Promise.all([
            getTeam(payload.email, payload.password),
          ])
            .then(([team]) => {
              auth.username = payload.email
              auth.password = payload.password
              set('credentials-email', payload.email)
              set('credentials-password', payload.password)
              return {user, team}
            })
        })
    }
  },
  updateUser: (payload) => {
    console.log('[api] [updateUser]', payload)
    return axios.request({
      method: 'PATCH',
      url: '/me',
      data: payload,
      baseURL: apis['api-core'],
      auth,
      responseType: 'json'
    })
      .then(response => {
        auth.username = payload.email
        set('credentials-email', payload.email)
        return response.data
      })
  },
  logIn,
  logOut,
  isLoggedIn,
  get: dGet,
  post,
  patch,
  del
}
