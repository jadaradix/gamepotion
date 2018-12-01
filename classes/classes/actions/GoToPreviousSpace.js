import Action from '../Action.js'

class GoToPreviousSpace extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'GoToPreviousSpace'
    this.name = 'Go to previous Space'
    this.description = 'Goes to the previous Space.'
    this.defaultRunArguments = new Map([
    ])
  }

  run(context, runArguments, appliesTo) {
    const spaceContainers = context.eventContext.resourceContainers.filter(rc => {
      return rc.resource.type === 'space'
    })
    // console.warn('[GoToNextSpace] [run] spaceContainers', spaceContainers)
    // console.warn('[GoToNextSpace] [run] this space id', context.eventContext.spaceContainer.resource.id)
    let spaceContainerIndex = 0
    let foundOtherSpaceContainer
    switch(context.platform) {
    case 'html5':
      while (spaceContainerIndex < spaceContainers.length) {
        if (spaceContainers[spaceContainerIndex].resource.id === context.eventContext.spaceContainer.resource.id) {
          break
        }
        spaceContainerIndex += 1
      }
      // console.warn('[GoToNextSpace] [run] spaceContainerIndex - 1', spaceContainerIndex - 1)
      foundOtherSpaceContainer = spaceContainers[spaceContainerIndex - 1]
      // console.warn('[GoToNextSpace] [run] foundOtherSpaceContainer', foundOtherSpaceContainer)
      if (typeof foundOtherSpaceContainer !== 'object') {
        return null
      }
      return {
        actionBack: 'SPACE_GO',
        actionBackArguments: [foundOtherSpaceContainer.resource.id],
        appliesTo
      }
    case 'nds':
      return ''
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    return 'Go to previous Space'
  }
}

export default GoToPreviousSpace
