import api from '../../../api.js'
import updateProject from '../update.js'

export default async function (state, { id }) {
  const currentProject = state.currentProject
  let newState = state
  if (currentProject.project.startSpace === id) {
    const startSpaceResource = currentProject.resources.find(r => {
      return (r.type === 'space' && r.id !== id)
    })
    if (startSpaceResource === undefined) {
      throw new Error('fuck')
    }
    newState = await updateProject(newState, { id: currentProject.project.id, startSpace: startSpaceResource.id })
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
