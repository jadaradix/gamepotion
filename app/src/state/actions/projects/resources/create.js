import api from '../../../api.js'
import classFactory from '../../../../classes/factory'

export default async function (state, { type, name }) {
  return api.post('api-core', `me/team/projects/${state.currentProject.project.id}/resources`, { type, name })
    .then(resource => {
      const resourceClass = classFactory.resource(resource)
      const currentProject = state.currentProject
      // this is for resources created automatically when projects are created
      if (!Array.isArray(currentProject.resources)) {
        currentProject.resources = []
      }
      //
      currentProject.resources.push(resourceClass)
      currentProject.currentResource = resourceClass
      return {
        ...state,
        currentProject
      }
    })
}
