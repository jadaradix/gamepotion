const axios = require('axios')
const createRandomString = require('../abstractions/createRandomString.js')

const URL_API_CORE = 'http://localhost:1025/v1'

async function setup () {
  const user = {
    userlandId: `${createRandomString()}@example.com`
  }
  const team = {
    name: 'FatQuack'
  }
  const project = {
    name: 'Aggressive Avians'
  }
  const configs = {
    auth: {
      validateStatus: false,
      auth: {
        username: user.userlandId
      }
    },
    noAuth: {
      validateStatus: false
    }
  }
  // USER
  const userResponse = await axios({
    method: 'post',
    url: `${URL_API_CORE}/users`,
    data: user,
    ...configs.noAuth
  })
  user.id = userResponse.data.id
  configs.auth.auth.password = userResponse.data.password
  // TEAM
  const teamResponse = await axios({
    method: 'post',
    url: `${URL_API_CORE}/teams`,
    data: team,
    ...configs.auth
  })
  team.id = teamResponse.data.id
  // UPDATE TEAM
  await axios({
    method: 'patch',
    url: `${URL_API_CORE}/me`,
    data: {
      teamId: team.id
    },
    ...configs.auth
  })
  // PROJECT
  const projectResponse = await axios({
    method: 'post',
    url: `${URL_API_CORE}/me/team/projects`,
    data: project,
    ...configs.auth
  })
  project.id = projectResponse.data.id
  return {
    URL_API_CORE,
    configs,
    user,
    team,
    project
  }
}

async function teardown (testData) {
  await axios({
    method: 'delete',
    url: `${URL_API_CORE}/me/team/projects/${testData.project.id}`,
    ...testData.configs.auth
  })
  await axios({
    method: 'delete',
    url: `${URL_API_CORE}/me/team`,
    ...testData.configs.auth
  })
  await axios({
    method: 'delete',
    url: `${URL_API_CORE}/me`,
    ...testData.configs.auth
  })
}

module.exports = {
  setup,
  teardown
}
