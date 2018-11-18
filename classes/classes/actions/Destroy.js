import Action from '../Action.js'

class Destroy extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'Destroy'
    this.name = 'Destroy'
    this.description = 'Destroys an instance.'
    this.defaultRunArguments = new Map([
    ])
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      return {
        actionBack: 'INSTANCE_DESTROY',
        actionBackArguments: [context.instance],
        appliesTo
      }
    case 'nds':
      return ''
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    const appliesToString = (() => {
      if (appliesTo === 'this') {
        return 'this instance'
      }
      if (appliesTo === 'other') {
        return 'other instance'
      }
      return '???'
    })()
    return `Destroy ${appliesToString}`
  }
}

export default Destroy
