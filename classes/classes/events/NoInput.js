import Event from '../Event.js'

class NoInput extends Event {
  constructor(json) {
    super(json)
    this.id = 'NoInput'
    this.name = 'No input'
    this.icon = 'noInput'
  }
}

export default NoInput
