import instanceDefinitionsToInstanceClasses from './instanceDefinitionsToInstanceClasses'
import handleActionBack from './handleActionBack'

const handleEvent = (event, eventContext, instanceClasses, appliesToInstanceClasses) => {
  let instanceClassesToDestroy = []
  let instancesToCreate = []
  appliesToInstanceClasses.forEach(i => {
    const actionBacks = i.onEvent(event, eventContext).filter(ab => typeof ab === 'object' && ab !== null)
    actionBacks.forEach(actionBack => {
      const result = handleActionBack(actionBack)
      instanceClassesToDestroy = instanceClassesToDestroy.concat(result.instanceClassesToDestroy)
      instancesToCreate = instancesToCreate.concat(result.instancesToCreate)
      if (typeof result.setImage === 'string') {
        i.imageContainer = eventContext.resourceContainers.find(r => r.resource.type === 'image' && r.resource.id === result.setImage)
      }
      if (typeof result.goToSpace === 'string') {
        console.warn('[Oscar] [handleEvent] result.goToSpace', result.goToSpace)
      }
    })
  })
  if (instanceClassesToDestroy.length > 0) {
    console.log('[Oscar] [handleEvent] instanceClassesToDestroy', instanceClassesToDestroy)
    instanceClasses = handleEvent('destroy', eventContext, instanceClasses, instanceClassesToDestroy)
  }
  const createdInstances = instanceDefinitionsToInstanceClasses(eventContext.resourceContainers, instancesToCreate)
  instanceClasses = instanceClasses.concat(createdInstances)
  if (createdInstances.length > 0) {
    console.log('[Oscar] [handleEvent] createdInstances', createdInstances)
    instanceClasses = handleEvent('create', eventContext, instanceClasses, createdInstances)
  }
  instanceClasses = instanceClasses.filter(ic => {
    const willDestroy = instanceClassesToDestroy.includes(ic)
    return (!willDestroy)
  })
  return instanceClasses
}

export default handleEvent
