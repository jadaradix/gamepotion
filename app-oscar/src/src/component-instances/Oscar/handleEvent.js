import instanceDefinitionsToInstanceClasses from './instanceDefinitionsToInstanceClasses'
import handleActionBack from './handleActionBack'

const handleEvent = (event, eventContext, resourceContainers, instanceClasses, appliesToInstanceClasses) => {
  let instanceClassesToDestroy = []
  let instancesToCreate = []
  appliesToInstanceClasses.forEach(i => {
    const actionBacks = i.onEvent(event, eventContext).filter(ab => typeof ab === 'object' && ab !== null)
    actionBacks.forEach(actionBack => {
      const result = handleActionBack(actionBack)
      instanceClassesToDestroy = instanceClassesToDestroy.concat(result.instanceClassesToDestroy)
      instancesToCreate = instancesToCreate.concat(result.instancesToCreate)
      if (typeof result.setImage === 'string') {
        i.imageContainer = resourceContainers.find(r => r.resource.type === 'image' && r.resource.id === result.setImage)
      }
      if (typeof result.goToSpace === 'string') {
        console.warn('[Oscar] [handleEvent] result.goToSpace', result.goToSpace)
      }
    })
  })
  if (instanceClassesToDestroy.length > 0) {
    console.log('[Oscar] [handleEvent] instanceClassesToDestroy', instanceClassesToDestroy)
    instanceClasses = handleEvent('destroy', eventContext, resourceContainers, instanceClasses, instanceClassesToDestroy)
  }
  const createdInstances = instanceDefinitionsToInstanceClasses(resourceContainers, instancesToCreate)
  instanceClasses = instanceClasses.concat(createdInstances)
  if (createdInstances.length > 0) {
    console.log('[Oscar] [handleEvent] createdInstances', createdInstances)
    instanceClasses = handleEvent('create', eventContext, resourceContainers, instanceClasses, createdInstances)
  }
  instanceClasses = instanceClasses.filter(ic => {
    const willDestroy = instanceClassesToDestroy.includes(ic)
    return (!willDestroy)
  })
  return instanceClasses
}

export default handleEvent
