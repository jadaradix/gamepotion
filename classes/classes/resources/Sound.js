import Resource from '../Resource.js'

class ResourceSound extends Resource {
  constructor (json = {}) {
    super(json)
    this.type = 'sound'
    this.extension = json.extension || 'wav'
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
    return `https://storage.googleapis.com/gmc-resources/${pathname}.${this.extension}`
  }

  toApi() {
    const r = super.toApi()
    return {
      ...r,
      fixed: this.fixed,
      extension: this.extension
    }
  }

  toDatastore() {
    const r = super.toDatastore()
    return {
      ...r,
      fixed: this.fixed,
      extension: this.extension
    }
  }

  fromApiPost(json) {
    super.fromApiPost(json)
    this.fixed = (typeof json.fixed === 'string' || json.fixed === null) ? json.fixed : this.fixed
  }

  fromApiPatch(json) {
    super.fromApiPatch(json)
    this.fixed = (typeof json.fixed === 'string' || json.fixed === null) ? json.fixed : this.fixed
    this.extension = (typeof json.extension === 'string') ? json.extension : this.extension // apis go away
  }

  clientFromApiGet(json) {
    super.clientFromApiGet(json)
    this.fixed = json.fixed
    this.extension = json.extension
  }
}

export default ResourceSound
