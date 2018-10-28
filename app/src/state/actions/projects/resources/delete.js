import api from '../../../api.js'

export default async function (state, { id }) {
  return api.del('api-core', `me/team/projects/${state.currentProject.project.id}/resources/${id}`)
    .then(() => {
      const currentProject = state.currentProject
      currentProject.resources = currentProject.resources.filter(resource => {
        return (resource.id !== id)
      })
      if (currentProject.currentResource !== null && currentProject.currentResource.id === id) {
        currentProject.currentResource = null
      }
      return {
        ...state,
        currentProject
      }
    })
}
