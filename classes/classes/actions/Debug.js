import Action from '../Action.js'

class Debug extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'Debug'
    this.name = 'Debug'
    this.description = 'Prints arguments.'
  }

  getDefaultRunArguments() {
    return []
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      console.log(runArguments)
      return null
    case 'nds':
      return `printf(${runArguments.join(', ')})`
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    const runArgumentsString = (() => {
      if (runArguments.length === 0) {
        return 'nothing'
      }
      return runArguments.join(', ')
    })()
    return `Print ${runArgumentsString}`
  }
}

export default Debug
