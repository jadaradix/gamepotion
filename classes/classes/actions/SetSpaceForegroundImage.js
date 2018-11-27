import Action from '../Action.js'

class SetSpaceForegroundImage extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'SetSpaceForegroundImage'
    this.name = 'Set Foreground Image'
    this.description = 'Sets the space foreground image.'
    this.defaultRunArguments = new Map([
      ['Image', {
        type: 'image',
        value: ''
      }]
    ])
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      return {
        actionBack: 'SPACE_SET_FOREGROUND_IMAGE',
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
    return `Set space foreground image to ${runArguments[0]}`
  }
}

export default SetSpaceForegroundImage
