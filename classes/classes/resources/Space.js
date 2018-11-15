import Resource from '../Resource.js'

const DEFAULT_WIDTH = 320
const DEFAULT_HEIGHT = 240

class ResourceSpace extends Resource {
  constructor (json = {}) {
    super(json)
    this.type = 'space'
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
    this.backgroundImage = ((typeof json.backgroundImage === 'string' || json.backgroundImage === null) ? json.backgroundImage : null)
    this.foregroundImage = ((typeof json.foregroundImage === 'string' || json.backgroundImage === null) ? json.foregroundImage : null)
    this.instances = json.instances || []
  }

  getDefaultName () {
    return 'New space'
  }

  toApi() {
    const r = super.toApi()
    return {
      ...r,
      width: this.width,
      height: this.height,
      camera: this.camera,
      backgroundImage: this.backgroundImage,
      foregroundImage: this.foregroundImage,
      instances: this.instances
    }
  }

  toDatastore() {
    const r = super.toDatastore()
    return {
      ...r,
      width: this.width,
      height: this.height,
      camera: this.camera,
      backgroundImage: this.backgroundImage,
      foregroundImage: this.foregroundImage,
      instances: this.instances
    }
  }

  fromApiPost(json) {
    super.fromApiPost(json)
    this.width = (typeof json.width === 'number') ? json.width : this.width
    this.height = (typeof json.height === 'number') ? json.height : this.height
    this.camera = (typeof json.camera === 'object') ? json.camera : this.camera
    this.backgroundImage = ((typeof json.backgroundImage === 'string' || json.backgroundImage === null) ? json.backgroundImage : this.backgroundImage)
    this.foregroundImage = ((typeof json.foregroundImage === 'string' || json.backgroundImage === null) ? json.foregroundImage : this.foregroundImage)
    this.instances = Array.isArray(json.instances) ? json.instances : this.instances
  }

  fromApiPatch(json) {
    super.fromApiPatch(json)
    this.width = (typeof json.width === 'number') ? json.width : this.width
    this.height = (typeof json.height === 'number') ? json.height : this.height
    this.camera = (typeof json.camera === 'object') ? json.camera : this.camera
    this.backgroundImage = ((typeof json.backgroundImage === 'string' || json.backgroundImage === null) ? json.backgroundImage : this.backgroundImage)
    this.foregroundImage = ((typeof json.foregroundImage === 'string' || json.backgroundImage === null) ? json.foregroundImage : this.foregroundImage)
    this.instances = Array.isArray(json.instances) ? json.instances : this.instances
  }

  clientFromApiGet(json) {
    super.clientFromApiGet(json)
    this.width = json.width
    this.height = json.height
    this.camera = json.camera
    this.backgroundImage = json.backgroundImage
    this.foregroundImage = json.foregroundImage
    this.instances = json.instances
  }
}

export default ResourceSpace
