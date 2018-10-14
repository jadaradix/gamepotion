import Resource from '../Resource.js'

class ResourceSpace extends Resource {
  constructor (json = {}) {
    super(json)
    this.type = 'space'
  }

  getDefaultName () {
    return 'New Space'
  }
}

export default ResourceSpace
