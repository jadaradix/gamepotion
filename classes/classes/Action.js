class Action {
  constructor (json = {}) {
    // DO NOT CREATE INSTANCES OF THIS ABSTRACT CLASS (always extended) IN USERLAND
    // USE THE CLASS FACTORY!
    this.id = 'AbstractActionIdBadNewsIfYouEverSeeThis'
    this.name = 'AbstractActionNameBadNewsIfYouEverSeeThis'
    this.description = 'AbstractActionDescriptionBadNewsIfYouEverSeeThis'
    this.appliesTo = json.appliesTo || 'this'
    this.runArguments = json.runArguments || this.getDefaultRunArguments()
  }

  getDefaultRunArguments() {
    console.warn('abstract getDefaultRunArguments() method of Action class was called. Bad news.')
    return []
  }

  run(event, platform, space, instance, runArguments) {
    console.warn('abstract run() method of Action class was called. Bad news.')
    return null
  }

  // optimisation hack; we are not creating instances of this class
  // on every Atom.jsx render; we cache them. so we do not have runArguments
  // on the class instance!
  toString(runArguments, appliesTo) {
    return `${this.name} (${runArguments.join(', ')} to ${appliesTo})`
  }
}

export default Action
