import Action from '../Action.js'

class Debug extends Action {
  constructor(json = {}) {
    super(json)
    this.name = 'Debug'
    this.description = 'Debug something'
  }

  getDefaultRunArguments() {
    return []
  }

  runStart() {
    return ''
  }

  runStep(platform) {
    switch(platform) {
    case 'html5':
      return `console.log(${this.runArguments.join(', ')})`
    case 'nds':
      return `printf(${this.runArguments.join(', ')})`
    default:
      return ''
    }
  }
}

export default Debug
