const handleActionBack = (instanceClasses, appliesToInstanceClasses, actionBack) => {
  // console.warn('[handleActionBack] instanceClasses/appliesToInstanceClasses/actionBack', instanceClasses, appliesToInstanceClasses, actionBack)
  const actionBackLogics = {
    'INSTANCE_DESTROY': () => {
      return {
        instanceClassesToDestroy: actionBack.actionBackArguments,
        instancesToCreate: []
      }
    },
    'INSTANCE_CREATE': () => {
      const instancesToCreate = [
        {
          atomId: actionBack.actionBackArguments[0],
          x: actionBack.actionBackArguments[1],
          y: actionBack.actionBackArguments[2],
          z: 0
        }
      ]
      return {
        instanceClassesToDestroy: [],
        instancesToCreate
      }
    }
  }
  const actionBackLogic = actionBackLogics[actionBack.actionBack]
  if (typeof actionBackLogic !== 'function') {
    throw new Error('unsupported actionBack type; this is quite bad')
  }
  return actionBackLogic()
}

export default handleActionBack
