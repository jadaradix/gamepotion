import Event from '../Event.js'

class Collision extends Event {
  constructor(json) {
    super(json)
    this.id = 'Collision'
    this.name = 'Collision'
    this.icon = 'collision'
  }
}

export default Collision
