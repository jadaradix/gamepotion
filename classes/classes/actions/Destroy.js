import Action from '../Action.js'

class Destroy extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'Destroy'
    this.name = 'Destroy'
    this.description = 'Destroy an instance.'
  }

  getDefaultRunArguments() {
    return []
  }

  run(event, platform, space, instance, runArguments, appliesTo) {
    switch(platform) {
    case 'html5':
      return {
        actionBack: 'INSTANCE_DESTROY',
        actionBackArguments: [],
        instance,
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
