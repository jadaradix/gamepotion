import getProjects from './get'

export default async function (state, { id }) {
  const confirmation = window.confirm('Are you sure?')
  if (confirmation === false) {
    return Promise.resolve(state)
  }
  let { projects } = await getProjects(state)
  projects = (() => {
    return projects.filter(project => {
      return (project.id !== id)
    })
  })()
  const currentProject = (() => {
    if (state.currentProject.id === id) {
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
