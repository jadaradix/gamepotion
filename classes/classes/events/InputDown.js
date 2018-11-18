import Event from '../Event.js'

class InputDown extends Event {
  constructor(json = {}) {
    super(json)
    this.id = 'inputDown'
    this.name = 'Press Down'
    this.icon = 'inputDown'
  }
}

export default InputDown
