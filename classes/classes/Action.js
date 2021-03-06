class Action {
  constructor (json = {}) {
    // DO NOT CREATE INSTANCES OF THIS ABSTRACT CLASS (always extended) IN USERLAND
    // USE THE CLASS FACTORY!
    this.id = 'AbstractActionIdBadNewsIfYouEverSeeThis'
    this.name = 'AbstractActionNameBadNewsIfYouEverSeeThis'
    this.description = 'AbstractActionDescriptionBadNewsIfYouEverSeeThis'
    this.defaultRunArguments = new Map([])
    this.runArguments = json.runArguments || []
    this.indentation = 0
    this.invertIndentation = false
    this.appliesTo = json.appliesTo || 'this'
    this.caresAboutAppliesTo = false
  }

  getDefaultRunArguments() {
    return Array.from(this.defaultRunArguments).map(kv => {
      return kv[1].value
    })
  }

  run(context, runArguments, appliesTo) {
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
