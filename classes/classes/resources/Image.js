import Resource from '../Resource.js'

class ResourceImage extends Resource {
  constructor (json = {}) {
    super(json)
    this.type = 'image'
    this.remoteUrl = json.remoteUrl || this.getRemoteUrl()
  }

  getDefaultName () {
    return 'New Image'
  }

  getRemoteUrl() {
    const id = 'fixed-image-ball' || this.id
    return `https://storage.googleapis.com/gmc-resources/${id}.png`
  }

  toApi() {
    const r = super.toApi()
    return {
      ...r,
      remoteUrl: this.remoteUrl
    }
  }
}

export default ResourceImage
