import getProjects from './get'

export default async function (state, { name }) {
  const { projects } = await getProjects(state)
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentProject = {
        project: {
          id: 'project-3',
          name
        },
        resources: null,
        currentResource: null
      }
      return resolve({
        ...state,
        projects: [
          ...projects,
          currentProject
        ],
        currentProject
      })
    }, 1000)
  })
}
