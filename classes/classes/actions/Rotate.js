import Action from '../Action.js'

const degreesToRadians = (degrees) => {
  return degrees * Math.PI / 180
}

// const radiansToDegrees = (radians) => {
//   return radians * 180 / Math.PI
// }

class Rotate extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'Rotate'
    this.name = 'Rotate'
    this.description = 'Rotates an instance.'
    this.defaultRunArguments = new Map([
      ['Degrees (-360 -> 360)', {
        type: 'generic',
        value: '0'
      }],
    ])
    this.caresAboutAppliesTo = true
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      context.instance.props.angle = degreesToRadians(runArguments[0])
      return null
    case 'nds':
      return ''
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    if (appliesTo === 'other') {
      return `Rotate other instance to ${runArguments[0]} degrees`
    }
    return `Rotate to ${runArguments[0]} degrees`
  }
}

export default Rotate
