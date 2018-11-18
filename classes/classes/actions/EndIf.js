import Action from '../Action.js'

class EndIf extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'EndIf'
    this.name = 'End If'
    this.description = 'Ends conditionally running actions.'
    this.defaultRunArguments = new Map([
    ])
    this.dedent = true
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      return null
    case 'nds':
      return '}'
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    return 'End If'
  }
}

export default EndIf
