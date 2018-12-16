import Event from '../Event.js'

class Step extends Event {
  constructor(json) {
    super(json)
    this.id = 'Step'
    this.name = 'Every frame'
    this.icon = 'step'
  }
}

export default Step
