import Event from '../Event.js'

class InputUp extends Event {
  constructor(json = {}) {
    super(json)
    this.id = 'inputUp'
    this.name = 'Press Up'
    this.icon = 'inputUp'
  }
}

export default InputUp
