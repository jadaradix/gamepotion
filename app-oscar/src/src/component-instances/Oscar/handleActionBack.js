const baseReturn = {
  instanceClassesToDestroy: [],
  instancesToCreate: [],
  setImage: null,
  goToSpace: null
}

const handleActionBack = (actionBack) => {
  // console.warn('[handleActionBack] actionBack', actionBack)
  const actionBackLogics = {
    'INSTANCE_DESTROY': () => {
      return {
        ...baseReturn,
        instanceClassesToDestroy: actionBack.actionBackArguments
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
        ...baseReturn,
        instancesToCreate,
      }
    },
    'INSTANCE_SET_IMAGE': () => {
      return {
        ...baseReturn,
        setImage: actionBack.actionBackArguments[0]
      }
    },
    'SPACE_GO': () => {
      return {
        ...baseReturn,
        goToSpace: actionBack.actionBackArguments[0]
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
