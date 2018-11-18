import instanceDefinitionsToInstanceClasses from './instanceDefinitionsToInstanceClasses'
import handleActionBack from './handleActionBack'

const handleEvent = (event, spaceContainer, resourceContainers, variables, instanceClasses, appliesToInstanceClasses) => {
  let instanceClassesToDestroy = []
  let instancesToCreate = []
  appliesToInstanceClasses.forEach(i => {
    const actionBacks = i.onEvent(event, spaceContainer, variables).filter(ab => typeof ab === 'object' && ab !== null)
    actionBacks.forEach(actionBack => {
      const result = handleActionBack(actionBack)
      instanceClassesToDestroy = instanceClassesToDestroy.concat(result.instanceClassesToDestroy)
      instancesToCreate = instancesToCreate.concat(result.instancesToCreate)
      if (typeof result.setImage === 'string') {
        i.imageContainer = resourceContainers.find(r => r.resource.type === 'image' && r.resource.id === result.setImage)
      }
    })
  })
  if (instanceClassesToDestroy.length > 0) {
    console.log('[Oscar] [handleEvent] instanceClassesToDestroy', instanceClassesToDestroy)
    instanceClasses = handleEvent('destroy', spaceContainer, resourceContainers, variables, instanceClasses, instanceClassesToDestroy)
  }
  const createdInstances = instanceDefinitionsToInstanceClasses(resourceContainers, instancesToCreate)
  instanceClasses = instanceClasses.concat(createdInstances)
  if (createdInstances.length > 0) {
    console.log('[Oscar] [handleEvent] createdInstances', createdInstances)
    instanceClasses = handleEvent('create', spaceContainer, resourceContainers, variables, instanceClasses, createdInstances)
  }
  instanceClasses = instanceClasses.filter(ic => {
    const willDestroy = instanceClassesToDestroy.includes(ic)
    return (!willDestroy)
  })
  return instanceClasses
}

export default handleEvent
