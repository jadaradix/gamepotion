import Event from '../Event.js'

class InputSecondary extends Event {
  constructor(json = {}) {
    super(json)
    this.id = 'inputSecondary'
    this.name = 'Press Secondary (B)'
    this.icon = 'inputSecondary'
  }
}

export default InputSecondary
