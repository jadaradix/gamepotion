class Event {
  constructor (configuration = []) {
    // DO NOT CREATE INSTANCES OF THIS ABSTRACT CLASS (always extended) IN USERLAND...
    // ALWAYS USE THE CLASS FACTORY!
    this.id = 'event-bad-news'
    this.name = 'Abstract Event (Bad News!)'
    this.icon = 'eventBadNews'
    this.defaultConfiguration = []
    this.configuration = configuration
    if (this.configuration.length !== this.defaultConfiguration.length) {
      this.configuration = this.defaultConfiguration.map(dc => dc.defaultValue)
    }
  }

  toString() {
    return this.name
  }
}

export default Event
