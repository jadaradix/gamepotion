import Resource from '../Resource.js'

const DEFAULT_WIDTH = 320
const DEFAULT_HEIGHT = 240

class ResourceSpace extends Resource {
  constructor (json = {}) {
    super(json)
    this.type = 'space'
    this.instances = json.instances || []
    this.width = (typeof json.width === 'number' ? json.width : DEFAULT_WIDTH)
    this.height = (typeof json.height === 'number' ? json.height : DEFAULT_HEIGHT)
    this.camera = (typeof json.camera === 'object' ?
      json.camera :
      {
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        x: 0,
        y: 0
      }
    )
  }

  getDefaultName () {
    return 'New Space'
  }

  toApi() {
    return JSON.parse(JSON.stringify(
      {
        ...super.toApi(),
        width: this.width,
        height: this.height,
        camera: this.camera
      }
    ))
  }

  toDatastore() {
    return JSON.parse(JSON.stringify(
      {
        ...super.toDatastore(),
        width: this.width,
        height: this.height,
        camera: this.camera
      }
    ))
  }

  fromApiPost(json) {
    super.fromApiPost(json)
    this.width = (typeof json.width === 'number') ? json.width : this.width
    this.height = (typeof json.height === 'number') ? json.height : this.height
    this.camera = (typeof json.camera === 'object') ? json.camera : this.camera
  }

  fromApiPatch(json) {
    super.fromApiPost(json)
    this.width = (typeof json.width === 'number') ? json.width : this.width
    this.height = (typeof json.height === 'number') ? json.height : this.height
    this.camera = (typeof json.camera === 'object') ? json.camera : this.camera
  }

  clientFromApiGet(json) {
    super.clientFromApiGet(json)
    this.width = json.width
    this.height = json.height
    this.camera = json.camera
  }
}

export default ResourceSpace
