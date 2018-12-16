import Resource from '../Resource.js'

class ResourceImage extends Resource {
  constructor (json = {}) {
    super(json)
    this.type = 'image'
    this.extension = json.extension || 'png'
    this.fixed = ((typeof json.fixed === 'string' || json.fixed === null) ? json.fixed : 'ball-red')
    this.frameWidth = (typeof json.frameWidth === 'number' ? json.frameWidth : 64)
    this.frameHeight = (typeof json.frameHeight === 'number' ? json.frameHeight : 64)
    this.frameSpeed = (typeof json.frameSpeed === 'number' ? json.frameSpeed : 1)
    this.frameCount = (typeof json.frameCount === 'number' ? json.frameCount : 1)
  }

  getDefaultName () {
    return 'New image'
  }

  getRemoteUrl() {
    const pathname = (() => {
      if (typeof this.fixed === 'string') {
        return `fixed-image-${this.fixed}`
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
      extension: this.extension,
      frameWidth: this.frameWidth,
      frameHeight: this.frameHeight,
      frameSpeed: this.frameSpeed,
      frameCount: this.frameCount
    }
  }

  toDatastore() {
    const r = super.toDatastore()
    return {
      ...r,
      fixed: this.fixed,
      extension: this.extension,
      frameWidth: this.frameWidth,
      frameHeight: this.frameHeight,
      frameSpeed: this.frameSpeed,
      frameCount: this.frameCount
    }
  }

  fromApiPost(json) {
    super.fromApiPost(json)
    this.fixed = (typeof json.fixed === 'string' || json.fixed === null) ? json.fixed : this.fixed
  }

  fromApiPatch(json) {
    super.fromApiPatch(json)
    this.fixed = (typeof json.fixed === 'string' || json.fixed === null) ? json.fixed : this.fixed
    this.frameWidth = (typeof json.frameWidth === 'number' ? json.frameWidth : this.frameWidth)
    this.frameHeight = (typeof json.frameHeight === 'number' ? json.frameHeight : this.frameHeight)
    this.frameSpeed = (typeof json.frameSpeed === 'number' ? json.frameSpeed : this.frameSpeed)
    this.frameCount = (typeof json.frameCount === 'number' ? json.frameCount : this.frameCount)
  }

  clientFromApiGet(json) {
    super.clientFromApiGet(json)
    this.fixed = json.fixed
    this.extension = json.extension
    this.frameWidth = json.frameWidth
    this.frameHeight = json.frameHeight
    this.frameSpeed = json.frameSpeed
    this.frameCount = json.frameCount
  }
}

export default ResourceImage
