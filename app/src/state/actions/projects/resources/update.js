import api from '../../../api.js'
import classFactory from '../../../../classes/factory'

export default async function (state, data) {
  return api.patch('api-core', `me/team/projects/${state.currentProject.project.id}/resources/${data.id}`, data)
    .then(resource => {
      const resourceClass = classFactory.resource(resource)
      resourceClass.clientFromApiGet(resource)
      const currentProject = state.currentProject
      currentProject.resources = currentProject.resources.map(resource => {
        if (resource.id === data.id) {
          resource = resourceClass
        }
        return resource
      })
      if (currentProject.currentResource.id === data.id) {
        currentProject.currentResource = resourceClass
      }
      return {
        ...state,
        currentProject
      }
    })
}
