import Action from '../Action.js'

class SetVariable extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'SetVariable'
    this.name = 'Set variable'
    this.description = 'Sets a variable.'
    this.defaultRunArguments = new Map([
      ['Variable', {
        type: 'variable',
        value: ''
      }],
      ['Value', {
        type: 'generic',
        value: ''
      }]
    ])
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      context.eventContext.variables.set(runArguments[0], runArguments[1])
      return null
    case 'nds':
      return `var_${runArguments[0]} = ${runArguments[1]};`
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    return `Set ${runArguments[0]} to ${runArguments[1]}`
  }
}

export default SetVariable
