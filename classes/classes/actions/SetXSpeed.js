import Action from '../Action.js'

class SetXSpeed extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'SetXSpeed'
    this.name = 'Set X Speed'
    this.description = 'Sets the X speed.'
  }

  getDefaultRunArguments() {
    return [1]
  }

  run(event, platform, space, instance, runArguments) {
    switch(platform) {
    case 'html5':
      instance.vcoords[0] = runArguments[0]
      return null
    case 'nds':
      return ''
    default:
      return null
    }
  }

  toString(runArguments) {
    return `Set X speed to ${runArguments[0]}`
  }
}

export default SetXSpeed
