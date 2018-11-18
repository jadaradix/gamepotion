import Event from '../Event.js'

class InputPrimary extends Event {
  constructor(json = {}) {
    super(json)
    this.id = 'inputPrimary'
    this.name = 'Press Primary (A)'
    this.icon = 'inputPrimary'
  }
}

export default InputPrimary
