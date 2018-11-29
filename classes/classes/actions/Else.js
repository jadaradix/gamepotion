import Action from '../Action.js'

class Else extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'Else'
    this.name = 'Else'
    this.description = 'Inverts conditionally running actions.'
    this.defaultRunArguments = new Map([
    ])
    this.invertIndentation = true
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      return null
    case 'nds':
      return '} else {'
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    return 'Else'
  }
}

export default Else
