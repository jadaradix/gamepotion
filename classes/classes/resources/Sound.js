import Resource from '../Resource.js'

class ResourceSound extends Resource {
  constructor (json = {}) {
    super(json)
    this.type = 'sound'
  }

  getDefaultName () {
    return 'New Sound'
  }

  getRemoteUrl() {
    return `https://storage.googleapis.com/gmc-resource-blobs/${this.id}.wav`
  }
}

export default ResourceSound
