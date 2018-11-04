import classes from './index.js'

const eventNames = Object.values(classes.events).map(eventClass => {
  const eventClassInstance = new eventClass()
  return eventClassInstance.toApi().id
})

const resourceTypeFunctions = new Map()
resourceTypeFunctions.set(
  'image',
  (resource) => {
    const c = new classes.resources.Image(resource)
    return c
  },
)
resourceTypeFunctions.set(
  'sound',
  (resource) => {
    const c = new classes.resources.Sound(resource)
    return c
  },
)
resourceTypeFunctions.set(
  'atom',
  (resource) => {
    const resourceClass = new classes.resources.Atom(resource)
    eventNames.forEach(eventName => {
      if (!Array.isArray(resourceClass.events[eventName])) {
        resourceClass.events[eventName] = []
      }
    })
    Object.keys(resourceClass.events).forEach((eventName) => {
      resourceClass.events[eventName] = resourceClass.events[eventName].filter(action => (classes.actions[action.name] !== undefined))
    })
    return resourceClass
  },
)
resourceTypeFunctions.set(
  'space',
  (resource) => {
    const c = new classes.resources.Space(resource)
    return c
  },
)

export default {
  user: (user) => {
    const c = new classes.User(user)
    return c
  },
  team: (team) => {
    const c = new classes.Team(team)
    return c
  },
  project: (project) => {
    const c = new classes.Project(project)
    return c
  },
  resource: (resource) => {
    const foundResourceTypeFunction = resourceTypeFunctions.get(resource.type)
    if (foundResourceTypeFunction !== undefined) {
      return foundResourceTypeFunction(resource)
    }
    throw new Error(`[classes.factory] [resource] i dont understand resource type '${resource.type}'`)
  }
}
