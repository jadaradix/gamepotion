import Event from '../Event.js'

class InputRight extends Event {
  constructor(json = {}) {
    super(json)
    this.id = 'inputRight'
    this.name = 'Press Right'
    this.icon = 'inputRight'
  }
}

export default InputRight
