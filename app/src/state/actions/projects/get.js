export default function (state) {
  if (Array.isArray(state.projects)) {
    return Promise.resolve(state)
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      const projects = [
        {
          project: {
            id: 'project-1',
            name: 'Project X'
          },
          resources: null,
          currentResource: null
        },
        {
          project: {
            id: 'project-2',
            name: 'Project Y'
          },
          resources: null,
          currentResource: null
        }
      ]
      const currentProject = (() => {
        // this is some auto load logic; it seems bad?
        if (state.currentProject === null) {
          return null
        } else {
          const foundCurrentProject = projects.find(project => project.project.id === state.currentProject.project.id)
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
