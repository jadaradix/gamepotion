import api from '../../../../api'

export default async function (state, { id }) {
  const currentProject = state.currentProject
  let newState = state
  if (currentProject.project.startSpace === id) {
    throw new Error('this is the \'Start Space\' of your game; choose another in \'Game settings\' first')
  }
  return api.del('api-core', `me/team/projects/${state.currentProject.project.id}/resources/${id}`)
    .then(() => {
      currentProject.resources = currentProject.resources.filter(resource => {
        return (resource.id !== id)
      })
      if (currentProject.currentResource !== null && currentProject.currentResource.id === id) {
        currentProject.currentResource = null
      }
      return {
        ...newState,
        currentProject
      }
    })
}
