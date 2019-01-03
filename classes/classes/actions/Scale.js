import Action from '../Action.js'

class Scale extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'Scale'
    this.name = 'Scale'
    this.description = 'Scales an instance.'
    this.defaultRunArguments = new Map([
      ['Scale (1+)', {
        type: 'generic',
        value: '1'
      }],
    ])
    this.caresAboutAppliesTo = true
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      context.instance.props.scale = runArguments[0]
      return null
    case 'nds':
      return ''
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    if (appliesTo === 'other') {
      return `Scale other instance by ${runArguments[0]}`
    }
    return `Scale by ${runArguments[0]}`
  }
}

export default Scale
