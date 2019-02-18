const baseReturn = {
  instancesToDestroy: [],
  instancesToCreate: []
}

const handleActionBack = (actionBack) => {
  // console.warn('[handleActionBack] actionBack', actionBack)
  const actionBackLogics = {
    'INSTANCE_DESTROY': () => {
      return {
        ...baseReturn,
        instancesToDestroy: actionBack.actionBackArguments
      }
    },
    'INSTANCE_CREATE': () => {
      return {
        ...baseReturn,
        instancesToCreate: [
          {
            atomId: actionBack.actionBackArguments[0],
            x: actionBack.actionBackArguments[1],
            y: actionBack.actionBackArguments[2],
            z: 0
          }
        ],
      }
    },
    'INSTANCE_SET_IMAGE': () => {
      return {
        ...baseReturn,
        imageToSet: actionBack.actionBackArguments[0]
      }
    },
    'SPACE_GO': () => {
      return {
        ...baseReturn,
        spaceToGoTo: actionBack.actionBackArguments[0]
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
