import Resource from '../Resource.js'

class ResourceSound extends Resource {
  constructor (json = {}) {
    super(json)
    this.type = 'sound'
    this.remoteUrl = json.remoteUrl || this.getRemoteUrl()
  }

  getDefaultName () {
    return 'New Sound'
  }

  getRemoteUrl() {
    const id = 'fixed-sound-zap' || this.id
    return `https://storage.googleapis.com/gmc-resources/${id}.wav`
  }

  toApi() {
    const r = super.toApi()
    return {
      ...r,
      remoteUrl: this.remoteUrl
    }
  }
}

export default ResourceSound
