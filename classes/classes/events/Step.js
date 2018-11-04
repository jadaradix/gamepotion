import Event from '../Event.js'

class Step extends Event {
  constructor(json = {}) {
    super(json)
    this.id = 'step'
    this.name = 'Every Frame'
    this.icon = 'step'
  }
}

export default Step
