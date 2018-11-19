import Action from '../Action.js'

class GoToSpace extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'GoToSpace'
    this.name = 'Go to Space'
    this.description = 'Goes to another Space.'
    this.defaultRunArguments = new Map([
      ['Space', {
        type: 'space',
        value: ''
      }]
    ])
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
    return {
      actionBack: 'SPACE_GO',
      actionBackArguments: [
        runArguments[0]
      ],
      appliesTo
    }
    case 'nds':
      return ''
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    return `Go to ${runArguments[0]}`
  }
}

export default GoToSpace
