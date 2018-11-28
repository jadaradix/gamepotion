import Action from '../Action.js'

class ShowMessage extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'ShowMessage'
    this.name = 'Show Message'
    this.description = 'Shows a message.'
    this.defaultRunArguments = new Map([
      ['Expression 1', {
        type: 'generic',
        value: ''
      }],
    ])
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      window.alert(runArguments[0])
      return null
    case 'nds':
      return `printf(${runArguments[0]});`
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    return `Show ${runArguments[0]}`
  }
}

export default ShowMessage
