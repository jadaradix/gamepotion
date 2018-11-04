import Action from '../Action.js'

class Debug extends Action {
  constructor(json = {}) {
    super(json)
    this.name = 'Debug'
    this.description = 'Print arguments'
  }

  getDefaultRunArguments() {
    return []
  }

  run(event, platform, instance, runArguments) {
    switch(platform) {
    case 'html5':
      console.log(runArguments)
      return null
    case 'nds':
      return `printf(${runArguments.join(', ')})`
    default:
      return ''
    }
  }
}

export default Debug
