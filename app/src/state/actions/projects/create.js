import getProjects from './get'

export default async function (state, { name }) {
  const { projects } = await getProjects(state)
  return new Promise((resolve) => {
    setTimeout(() => {
      const createdProject = {
        id: 'project-3',
        name
      }
      return resolve({
        ...state,
        projects: [
          ...projects,
          createdProject
        ],
        currentProject: createdProject
      })
    }, 1000)
  })
}
