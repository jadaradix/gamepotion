class Action {
  constructor (json = {}) {
    // DO NOT CREATE INSTANCES OF THIS ABSTRACT CLASS (always extended) IN USERLAND
    // USE THE CLASS FACTORY!
    this.name = 'AbstractActionBadNewsIfYouEverSeeThis'
    this.description = 'AbstractActionBadNewsIfYouEverSeeThis'
    this.runArguments = json.runArguments || this.getDefaultRunArguments()
  }

  getDefaultRunArguments() {
    console.warn('abstract getDefaultRunArguments() method of Action class was called. Bad news.')
    return []
  }

  runStart(platform) {
    console.warn('abstract runStart() method of Action class was called. Bad news.')
    return ''
  }

  runStep(platform) {
    console.warn('abstract runStep() method of Action class was called. Bad news.')
    return ''
  }

  toApi() {
    return {
      name: this.name,
      description: this.description
    }
  }
}

export default Action
