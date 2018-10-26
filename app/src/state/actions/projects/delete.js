import getProjects from './get'

export default async function (state, { id }) {
  let { projects } = await getProjects(state)
  projects = (() => {
    return projects.filter(project => {
      return (project.project.id !== id)
    })
  })()
  const currentProject = (() => {
    if (state.currentProject === null) {
      return state.currentProject
    }
    if (state.currentProject.project.id === id) {
      return null
    }
    return state.currentProject
  })()
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        ...state,
        projects,
        currentProject
      })
    }, 1000)
  })
}
