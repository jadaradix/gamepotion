import Action from '../Action.js'

class Move extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'Move'
    this.name = 'Move'
    this.description = 'Moves an instance.'
    this.defaultRunArguments = new Map([
      ['X', {
        type: 'generic',
        value: ''
      }],
      ['Y', {
        type: 'generic',
        value: ''
      }]
    ])
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      context.instance.props.x = runArguments[0]
      context.instance.props.y = runArguments[1]
      return null
    case 'nds':
      return ''
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    if (appliesTo === 'other') {
      return `Move other instance to ${runArguments[0]}, ${runArguments[1]}`
    }
    return `Move to ${runArguments[0]}, ${runArguments[1]}`
  }
}

export default Move
