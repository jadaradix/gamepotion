import Action from '../Action.js'

class IfPlayerConfirms extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'IfPlayerConfirms'
    this.name = 'If the player confirms'
    this.description = 'If the player confirms something through a yes/no dialog.'
    this.defaultRunArguments = new Map([
      ['Message', {
        type: 'generic',
        value: '"are you okay?"'
      }],
    ])
    this.indentation = 1
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      return window.confirm(runArguments[0])
    case 'nds':
      return ''
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    return `If the player confirms ${runArguments[0]}`
  }
}

export default IfPlayerConfirms
