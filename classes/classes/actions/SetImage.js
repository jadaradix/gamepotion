import Action from '../Action.js'

class SetImage extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'SetImage'
    this.name = 'Set image'
    this.description = 'Sets the instance image.'
    this.defaultRunArguments = new Map([
      ['Image', {
        type: 'image',
        value: ''
      }]
    ])
    this.caresAboutAppliesTo = true
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      return {
        actionBack: 'INSTANCE_SET_IMAGE',
        actionBackArguments: [
          runArguments[0]
        ],
        appliesTo
      }
    case 'nds':
      return ''
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    return `Set image to ${runArguments[0]}`
  }
}

export default SetImage
