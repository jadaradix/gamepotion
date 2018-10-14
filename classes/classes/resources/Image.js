import Resource from '../Resource.js'

class ResourceImage extends Resource {
  constructor (json = {}) {
    super(json)
    this.type = 'image'
  }

  getDefaultName () {
    return 'New Image'
  }

  getRemoteUrl() {
    return `https://storage.googleapis.com/gmc-resource-blobs/${this.id}.png`
  }
}

export default ResourceImage
