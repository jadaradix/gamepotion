import Event from '../Event.js'

class Touch extends Event {
  constructor(json) {
    super(json)
    this.id = 'Touch'
    this.name = 'Touch'
    this.icon = 'touch'
  }
}

export default Touch
