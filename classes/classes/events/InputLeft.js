import Event from '../Event.js'

class InputLeft extends Event {
  constructor(json = {}) {
    super(json)
    this.id = 'inputLeft'
    this.name = 'Press Left'
    this.icon = 'inputLeft'
  }
}

export default InputLeft
