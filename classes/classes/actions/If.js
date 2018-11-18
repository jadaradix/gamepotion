import Action from '../Action.js'

class If extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'If'
    this.name = 'If'
    this.description = 'Conditionally runs actions.'
    this.defaultRunArguments = new Map([
      ['Expression 1', {
        type: 'generic',
        value: ''
      }],
      ['Expression 2', {
        type: 'generic',
        value: ''
      }]
    ])
    this.indent = true
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      return null
    case 'nds':
      return `if(${runArguments[0]} == ${runArguments[1]}) {`
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    return `If ${runArguments[0]} is ${runArguments[1]}`
  }
}

export default If
