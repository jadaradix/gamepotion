class Action {
  constructor (json = {}) {
    // DO NOT CREATE INSTANCES OF THIS ABSTRACT CLASS (always extended) IN USERLAND
    // USE THE CLASS FACTORY!
    this.name = 'AbstractActionBadNewsIfYouEverSeeThis'
    this.runArguments = json.runArguments || this.getDefaultRunArguments()
  }

  getDefaultRunArguments() {
    console.warn('abstract getDefaultRunArguments() method of Action class was called. Bad news.')
    return []
  }

  runBefore(platform, runArguments) {
    console.warn('abstract run() method of Action class was called. Bad news.')
    return null
  }

  runStep(platform, runArguments) {
    return null
  }
}

export default Action
