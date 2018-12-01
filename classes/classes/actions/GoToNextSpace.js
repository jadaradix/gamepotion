import Action from '../Action.js'

class GoToNextSpace extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'GoToNextSpace'
    this.name = 'Go to next Space'
    this.description = 'Goes to the next Space.'
    this.defaultRunArguments = new Map([
    ])
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      return {
        actionBack: 'SPACE_GO_NEXT',
        actionBackArguments: [],
        appliesTo
      }
    case 'nds':
      return ''
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    return 'Go to next Space'
  }
}

export default GoToNextSpace
