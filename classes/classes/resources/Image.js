import Resource from '../Resource.js'

class ResourceImage extends Resource {
  constructor (json = {}) {
    super(json)
    this.type = 'image'
  }

  getDefaultName () {
    return 'New Image'
  }
}

export default ResourceImage
