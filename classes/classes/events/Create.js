import Event from '../Event.js'

class Create extends Event {
  constructor(json = {}) {
    super(json)
    this.id = 'Create'
    this.name = 'Create'
    this.icon = 'create'
  }
}

export default Create
