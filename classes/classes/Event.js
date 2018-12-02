class Event {
  constructor () {
    // DO NOT CREATE INSTANCES OF THIS ABSTRACT CLASS (always extended) IN USERLAND...
    // ALWAYS USE THE CLASS FACTORY!
    this.id = 'event-bad-news'
    this.name = 'Abstract Event (Bad News!)'
    this.icon = 'eventBadNews'
    this.defaultConfiguration = []
    this.configuration = []
  }

  toApi() {
    return {
      id: this.id,
      name: this.name,
      icon: this.icon
    }
  }

  toString() {
    return this.name
  }
}

export default Event
