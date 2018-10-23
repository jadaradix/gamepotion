export default function (state) {
  if (Array.isArray(state.projects)) {
    return Promise.resolve(state)
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      const projects = [
        {
          id: 'project-1',
          name: 'Project X'
        },
        {
          id: 'project-2',
          name: 'Project Y'
        }
      ]
      const currentProject = (() => {
        if (state.currentProject === null) {
          return (projects.length > 0 ? projects[0] : null)
        } else {
          const foundCurrentProject = projects.find(project => project.id === state.currentProject.id)
          return foundCurrentProject || null
        }
      })()
      return resolve({
        ...state,
        projects,
        currentProject
      })
    }, 0)
  })
}
