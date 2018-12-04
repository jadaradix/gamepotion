import Event from '../Event.js'

class Destroy extends Event {
  constructor(json = {}) {
    super(json)
    this.id = 'Destroy'
    this.name = 'Destroy'
    this.icon = 'destroy'
  }
}

export default Destroy
