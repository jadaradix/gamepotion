export default async function (state, { id }) {
  const currentResource = state.currentProject.resources.find(resource => resource.id === id)
  if (currentResource === undefined) {
    return Promise.reject(`could not find resource with id ${id}!`)
  }
  state.currentProject.currentResource = currentResource
  return Promise.resolve(state)
}
