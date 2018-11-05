import Action from '../Action.js'

class SetYSpeed extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'SetYSpeed'
    this.name = 'Set Y Speed'
    this.description = 'Sets the Y speed.'
  }

  getDefaultRunArguments() {
    return [1]
  }

  run(event, platform, space, instance, runArguments, appliesTo) {
    switch(platform) {
    case 'html5':
      instance.vcoords[1] = runArguments[0]
      return null
    case 'nds':
      return ''
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    if (appliesTo === 'other') {
      return `Set other instance Y speed to ${runArguments[0]}`
    }
    return `Set Y speed to ${runArguments[0]}`
  }
}

export default SetYSpeed
