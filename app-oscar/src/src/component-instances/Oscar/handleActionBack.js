const handleActionBack = (actionBack) => {
  // console.warn('[handleActionBack] actionBack', actionBack)
  const actionBackLogics = {
    'INSTANCE_DESTROY': () => {
      return {
        instanceClassesToDestroy: actionBack.actionBackArguments,
        instancesToCreate: [],
        setImage: null
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
        instancesToCreate,
        setImage: null
      }
    },
    'INSTANCE_SET_IMAGE': () => {
      return {
        instanceClassesToDestroy: [],
        instancesToCreate: [],
        setImage: actionBack.actionBackArguments[0]
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
