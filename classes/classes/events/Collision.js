import Event from '../Event.js'

class Collision extends Event {
  constructor(json) {
    super({
      ...json,
      defaultConfiguration: [
        {
          name: 'Atom',
          type: 'atom',
          value: ''
        }
      ]
    })
    this.id = 'Collision'
    this.name = 'Collision'
    this.icon = 'collision'
  }

  toString(resources) {
    // console.warn('[event-Collision] [toString] this.defaultConfiguration', this.defaultConfiguration)
    // console.warn('[event-Collision] [toString] this.configuration', this.configuration)
    const atom = resources.find(v => v.id === this.configuration[0])
    return 'Collision with ' + (typeof atom === 'object' ? atom.name : '???')
  }
}

export default Collision
