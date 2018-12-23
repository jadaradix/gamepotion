import Resource from '../Resource.js'

class ResourceAtom extends Resource {
  constructor(json = {}) {
    super(json)
    this.type = 'atom'
    this.events = (Array.isArray(json.events)) ? json.events : [
      {
        id: 'Create',
        configuration: [],
        actions: []
      }
    ]
    this.imageId = (typeof json.imageId === 'string' || json.imageId === null) ? json.imageId : null
    this.angle = (typeof json.angle === 'number') ? json.angle : 0
    this.depth = (typeof json.depth === 'number') ? json.depth : 0
  }

  getDefaultName() {
    return 'New atom'
  }

  toApi() {
    const r = super.toApi()
    return {
      ...r,
      events: this.events,
      imageId: this.imageId,
      angle: this.angle,
      depth: this.depth
    }
  }

  toDatastore() {
    const r = super.toDatastore()
    return {
      ...r,
      events: this.events,
      imageId: this.imageId,
      angle: this.angle,
      depth: this.depth
    }
  }

  fromApiPost(json) {
    super.fromApiPost(json)
    this.events = (Array.isArray(json.events)) ? json.events : this.events
    this.imageId = (typeof json.imageId === 'string' || json.imageId === null) ? json.imageId : this.imageId
    this.angle = (typeof json.angle === 'number') ? json.angle : this.angle
    this.depth = (typeof json.depth === 'number') ? json.depth : this.depth
  }

  fromApiPatch(json) {
    super.fromApiPatch(json)
    this.events = (Array.isArray(json.events)) ? json.events : this.events
    this.imageId = (typeof json.imageId === 'string' || json.imageId === null) ? json.imageId : this.imageId
    this.angle = (typeof json.angle === 'number') ? json.angle : this.angle
    this.depth = (typeof json.depth === 'number') ? json.depth : this.depth
  }

  clientFromApiGet(json) {
    super.clientFromApiGet(json)
    this.events = json.events
    this.imageId = json.imageId
    this.angle = json.angle
    this.depth = json.depth
  }
}

export default ResourceAtom
