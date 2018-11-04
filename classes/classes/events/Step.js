import Event from '../Event.js'

class Step extends Event {
  constructor(json = {}) {
    super(json)
    this.id = 'step'
    this.name = 'Step'
    this.icon = 'step'
  }
}

export default Step
