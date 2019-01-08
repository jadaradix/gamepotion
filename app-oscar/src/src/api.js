import axios from 'axios'
import { getState } from './state'

const productionBaseDomain = (() => {
  return window.location.hostname.substring(window.location.hostname.indexOf('.') + 1)
})()

const envs = {
  'development': {
    apis: {
      'api-core': 'http://localhost:1025/v1',
      'api-bin': 'http://localhost:1026/v1'
    }
  },
  'production': {
    apis: {
      'api-core': `https://api-core.${productionBaseDomain}/v1`,
      'api-bin': `https://api-bin.${productionBaseDomain}/v1`
    }
  }
}
const apis = envs[process.env.NODE_ENV].apis

const auth = {
  username: getState().credentials.userlandId,
  password: getState().credentials.password
}

const getUser = (username, password) => {
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

const getTeam = (username, password) => {
  // console.log('[api] [getTeam] username/password', username, password)
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

function logIn (username, password) {
  // console.log('[api] [logIn] username/password', username, password)
  return Promise.all([
    getUser(username, password),
    getTeam(username, password),
  ])
    .then(([user, team]) => {
      auth.username = username
      auth.password = password
      return {user, team}
    })
}

function logOut () {
  // console.log('[api] [logOut]')
  auth.username = ''
  auth.password = ''
}

function isLoggedIn () {
  // console.log('[api] [isLoggedIn] auth', auth)
  return (auth.username.length > 0 && auth.password.length > 0)
  // return new Promise(resolve => {
  //   logIn(auth.username, auth.password)
  //     .then(() => resolve(true))
  //     .catch(() => resolve(false))
  // })
}

function dGet (whichApi, url, publicContext = false) {
  // console.log('[api] [dGet] whichApi/url', whichApi, url)
  // console.log('[api] [dGet] publicContext', publicContext)
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
  // console.log('[api] [post] whichApi/url', whichApi, url)
  // console.log('[api] [post] auth', auth)
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
  // console.log('[api] [patch]', whichApi, url)
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
  // console.log('[api] [del] whichApi/url', whichApi, url)
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

function uploadBin (url, formData) {
  const config = {
    baseURL: apis['api-bin'],
    auth,
    responseType: 'json',
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  return axios.post(url, formData, config)
    .then(response => response.data)
}

export default {
  createUser: (payload) => {
    // console.log('[api] [createUser] payload', payload)
    return axios.request({
      method: 'POST',
      url: '/users',
      data: payload,
      baseURL: apis['api-core'],
      responseType: 'json'
    })
      .then(response => {
        auth.username = response.data.userlandId
        auth.password = response.data.password
        return response.data
      })
  },
  updateUser: (payload) => {
    // console.log('[api] [updateUser] payload', payload)
    return axios.request({
      method: 'PATCH',
      url: '/me',
      data: payload,
      baseURL: apis['api-core'],
      auth,
      responseType: 'json'
    })
      .then(response => {
        auth.username = payload.userlandId
        auth.password = payload.password
        return response.data
      })
  },
  logIn,
  logOut,
  isLoggedIn,
  get: dGet,
  post,
  patch,
  del,
  uploadBin
}
