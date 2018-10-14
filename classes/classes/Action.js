class Action {
  constructor (json = {}) {
    // DO NOT CREATE INSTANCES OF THIS ABSTRACT CLASS (always extended) IN USERLAND
    // USE THE CLASS FACTORY!
    this.name = 'AbstractActionBadNewsIfYouEverSeeThis'
    this.runArguments = json.runArguments || this.getDefaultRunArguments()
  }

  getDefaultRunArguments () {
    console.warn('abstract getDefaultRunArguments() method of Action class was called. Bad news. Every action should extended this method.')
    return []
  }

  run () {
    console.warn('abstract run() method of Action class was called. Bad news. Every action should extended this method.')
    return null
  }
}

export default Action
