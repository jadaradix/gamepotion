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
    switch(context.platform) {
    case 'html5':
      return {
        actionBack: 'SPACE_GO_PREVIOUS',
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
    return 'Go to previous Space'
  }
}

export default GoToPreviousSpace
