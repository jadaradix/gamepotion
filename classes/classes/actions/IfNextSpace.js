import Action from '../Action.js'

class IfNextSpace extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'IfNextSpace'
    this.name = 'If Next Space'
    this.description = 'Conditionally runs actions when there is a next space.'
    this.defaultRunArguments = new Map([
    ])
    this.indentation = 1
  }

  run(context, runArguments, appliesTo) {
    const spaceContainers = context.eventContext.resourceContainers.filter(rc => {
      return rc.resource.type === 'space'
    })
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
      foundOtherSpaceContainer = spaceContainers[spaceContainerIndex + 1]
      return (typeof foundOtherSpaceContainer === 'object')
    case 'nds':
      return ''
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    return 'If there is a next Space'
  }
}

export default IfNextSpace
