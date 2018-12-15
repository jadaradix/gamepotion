import Action from '../Action.js'

class SetFrame extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'SetFrame'
    this.name = 'Set frame'
    this.description = 'Sets the instance frame.'
    this.defaultRunArguments = new Map([
      ['Frame', {
        type: 'generic',
        value: ''
      }]
    ])
    this.caresAboutAppliesTo = true
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      console.warn('runArguments[0]', runArguments[0])
      context.instance.props.frame = runArguments[0]
      return null
    case 'nds':
      return ''
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    return `Set frame to ${runArguments[0]}`
  }
}

export default SetFrame
