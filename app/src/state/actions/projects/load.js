import api from '../../api.js'
import classFactory from '../../../classes/factory'
import getProjects from './get'

const getResources = (projectId) => {
  return api.get('api-core', `me/team/projects/${projectId}/resources`)
    .then(resources => {
      return resources.map(resource => classFactory.resource(resource))
    })
}

export default async function (state, { id, resourceId }) {
  const { projects } = await getProjects(state)
  const currentProject = projects.find(project => project.project.id === id)
  if (currentProject === undefined) {
    throw new Error('This project couldn&rsquo;t be loaded.')
  }
  if (currentProject.resources === null) {
    try {
      currentProject.resources = await getResources(id)
    } catch (error) {
      throw new Error('This project&rsquo;s resources couldn&rsquo;t be loaded.')
    }
  }
  return Promise.resolve({
    ...state,
    projects,
    currentProject
  })
}
