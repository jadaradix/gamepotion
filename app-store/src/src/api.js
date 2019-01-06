import axios from 'axios'
import { get } from './localStorage'
import envs from './envs'

const { apis } = envs[process.env.NODE_ENV]

const getAccessToken = () => {
  return get('access-token')
}

function dGet (whichApi, url) {
  const accessToken = getAccessToken()
  console.log('[api] [dGet] whichApi/url', whichApi, url)
  console.log('[api] [dGet] accessToken', accessToken)
  const r = {
    method: 'GET',
    url,
    headers: {'Authorization': `Bearer ${accessToken}`},
    baseURL: apis[whichApi],
    responseType: 'json'
  }
  return axios.request(r)
    .then(response => response.data)
}

function post (whichApi, url, data) {
  const accessToken = getAccessToken()
  console.log('[api] [dGet] whichApi/url', whichApi, url)
  console.log('[api] [dGet] accessToken', accessToken)
  return axios.request({
    method: 'POST',
    url,
    headers: {'Authorization': `Bearer ${accessToken}`},
    data,
    baseURL: apis[whichApi],
    responseType: 'json'
  })
    .then(response => response.data)
}

export default {
  get: dGet,
  post
}
