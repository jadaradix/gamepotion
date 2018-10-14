import Resource from '../Resource.js'

class ResourceAtom extends Resource {
  constructor(json = {}) {
    super(json)
    this.type = 'atom'
    this.events = json.events || {}
  }

  setEvents(events) {
    this.events = events
  }

  getDefaultName() {
    return 'New Atom'
  }

  toApi() {
    return JSON.parse(JSON.stringify(
      {
        ...super.toApi(),
        events: this.events
      }
    ))
  }

  toDatastore() {
    return JSON.parse(JSON.stringify(
      {
        ...super.toDatastore(),
        events: this.events
      }
    ))
  }

  fromApiPost(json) {
    super.fromApiPost(json)
    this.events = json.events
  }

  fromApiPatch(json) {
    super.fromApiPatch(json)
    this.events = (typeof json.events === 'object') ? json.events : this.events
  }

  clientFromApiGet(json) {
    super.clientFromApiGet(json)
    this.events = json.events
  }
}

export default ResourceAtom
