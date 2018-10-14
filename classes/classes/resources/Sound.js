import Resource from '../Resource.js'

class ResourceSound extends Resource {
  constructor (json = {}) {
    super(json)
    this.type = 'sound'
  }

  getDefaultName () {
    return 'New Sound'
  }
}

export default ResourceSound
