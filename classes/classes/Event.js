class Event {
  constructor () {
    // DO NOT CREATE INSTANCES OF THIS ABSTRACT CLASS (always extended) IN USERLAND
    // USE THE CLASS FACTORY!
    this.id = 'event-bad-news'
    this.name = 'AbstractEventBadNewsIfYouEverSeeThis'
    this.icon = 'eventBadNews'
  }

  toApi() {
    return {
      id: this.id,
      name: this.name,
      icon: this.icon
    }
  }
}

export default Event
