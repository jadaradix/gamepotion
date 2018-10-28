import api from '../../../api.js'
import classes from '../../../../classes'

export default async function (state, data) {
  return api.patch('api-core', `me/team/projects/${state.currentProject.project.id}/resources/${data.id}`, data)
    .then(resource => {
      const resourceClass = new classes.Resource()
      resourceClass.clientFromApiGet(resource)
      const currentProject = state.currentProject
      currentProject.resources = currentProject.resources.map(resource => {
        if (resource.id === data.id) {
          resource = resourceClass
        }
        return resource
      })
      return {
        ...state,
        currentProject
      }
    })
}
