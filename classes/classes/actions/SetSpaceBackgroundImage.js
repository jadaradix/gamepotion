import Action from '../Action.js'

class SetSpaceBackgroundImage extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'SetSpaceBackgroundImage'
    this.name = 'Set Background Image'
    this.description = 'Sets the space background image.'
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
        actionBack: 'SPACE_SET_BACKGROUND_IMAGE',
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
    return `Set space background image to ${runArguments[0]}`
  }
}

export default SetSpaceBackgroundImage
