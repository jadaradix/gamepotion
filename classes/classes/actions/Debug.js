import Action from '../Action.js'

class Debug extends Action {
  constructor (json = {}) {
    super(json)
    this.name = 'Debug'
  }

  getDefaultRunArguments () {
    return []
  }

  run (runArguments) {
    console.log('[Action::Debug]', ...runArguments)
    return null
  }
}

export default Debug
