import getProjects from './get'

const getResources = (projectId) => {
  const resources = [
    {
      type: 'image',
      id: 'image-1',
      name: 'Image 1'
    },
    {
      type: 'image',
      id: 'image-2',
      name: 'Image 2'
    },
    {
      type: 'sound',
      id: 'sound-1',
      name: 'Sound 1'
    },
    {
      type: 'sound',
      id: 'sound-2',
      name: 'Sound 2'
    },
    {
      type: 'atom',
      id: 'atom-1',
      name: 'Atom 1'
    },
    {
      type: 'atom',
      id: 'atom-2',
      name: 'Atom 2'
    },
    {
      type: 'space',
      id: 'space-1',
      name: 'Space 1'
    },
    {
      type: 'space',
      id: 'space-2',
      name: 'Space 2'
    },
    {
      type: 'space',
      id: 'space-3',
      name: 'Space 3'
    },
    {
      type: 'space',
      id: 'space-4',
      name: 'Space 4'
    },
    {
      type: 'space',
      id: 'space-5',
      name: 'Space 5'
    },
    {
      type: 'space',
      id: 'space-6',
      name: 'Space 6'
    },
    {
      type: 'space',
      id: 'space-7',
      name: 'Space 7'
    },
    {
      type: 'space',
      id: 'space-8',
      name: 'Space 8'
    },
    {
      type: 'space',
      id: 'space-9',
      name: 'Space 9'
    },
    {
      type: 'space',
      id: 'space-10',
      name: 'Space 10'
    }
  ]
  return Promise.resolve(resources)
}

export default async function (state, { id }) {
  const { projects } = await getProjects(state)
  const currentProject = projects.find(project => project.project.id === id)
  if (currentProject === undefined) {
    return Promise.reject(`could not find project with id ${id} from getProjects!`)
  }
  if (currentProject.resources === null) {
    currentProject.resources = await getResources(id)
    currentProject.currentResource = currentProject.resources[0]
  }
  return Promise.resolve({
    ...state,
    projects,
    currentProject
  })
}
