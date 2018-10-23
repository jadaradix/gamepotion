import getProjects from './get'

export default async function (state, { id }) {
  const { projects } = await getProjects(state)
  const currentProject = projects.find(project => project.id === id)
  if (currentProject === undefined) {
    return Promise.reject(`could not find project with id${id} in getProjects returnable!`)
  }
  return Promise.resolve({
    ...state,
    currentProject
  })
}
