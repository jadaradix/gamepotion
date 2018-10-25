import getProjects from './get'

export default async function (state, { id, name }) {
  let { projects } = await getProjects(state)
  projects = (() => {
    return projects.map(project => {
      if (project.project.id === id) {
        project.project.name = name
      }
      return project
    })
  })()
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve({
        ...state,
        projects
      })
    }, 1000)
  })
}
