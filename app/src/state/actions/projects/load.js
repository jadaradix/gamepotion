import api from '../../api.js'
import classFactory from '../../../classes/factory'
import getProjects from './get'

const getResources = (projectId) => {
  return api.get('api-core', `me/team/projects/${projectId}/resources`)
    .then(resources => {
      return resources.map(resource => classFactory.resource(resource))
    })
}

export default async function (state, { id }) {
  const { projects } = await getProjects(state)
  const currentProject = projects.find(project => project.project.id === id)
  if (currentProject === undefined) {
    return Promise.resolve({
      ...state,
      currentProject: null
    })
  }
  if (currentProject.resources === null) {
    try {
      currentProject.resources = await getResources(id)
      currentProject.currentResource = currentProject.resources[0]
    } catch (error) {
      return Promise.resolve({
        ...state,
        currentProject: null
      })
    }
  }
  return Promise.resolve({
    ...state,
    projects,
    currentProject
  })
}
