import api from '../../api.js'

export default function (state, { email, password }) {
  api.logOut(email, password)
  return Promise.resolve({
    ...state,
    user: null,
    team: null,
    projects: null,
    currentProject: null
  })
}
