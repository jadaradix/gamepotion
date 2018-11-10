import Resource from '../Resource.js'

class ResourceSound extends Resource {
  constructor (json = {}) {
    super(json)
    this.type = 'sound'
    this.fixed = ((typeof json.fixed === 'string' || json.fixed === null) ? json.fixed : 'zap')
  }

  getDefaultName () {
    return 'New sound'
  }

  getRemoteUrl() {
    const pathname = (() => {
      if (typeof this.fixed === 'string') {
        return `fixed-sound-${this.fixed}`
      } else {
        return this.id
      }
    })()
    return `https://storage.googleapis.com/gmc-resources/${pathname}.wav`
  }

  toApi() {
    const r = super.toApi()
    return {
      ...r,
      fixed: this.fixed,
      remoteUrl: this.getRemoteUrl()
    }
  }

  toDatastore() {
    const r = super.toDatastore()
    return {
      ...r,
      fixed: this.fixed
    }
  }

  fromApiPost(json) {
    super.fromApiPost(json)
    this.fixed = (typeof json.fixed === 'string' || json.fixed === null) ? json.fixed : this.fixed
  }

  fromApiPatch(json) {
    super.fromApiPatch(json)
    this.fixed = (typeof json.fixed === 'string' || json.fixed === null) ? json.fixed : this.fixed
  }

  clientFromApiGet(json) {
    super.clientFromApiGet(json)
    this.fixed = json.fixed
  }
}

export default ResourceSound
