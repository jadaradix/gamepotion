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
    const foundImage = context.eventContext.resourceContainers.find(r => r.resource.id === runArguments[0])
    switch(context.platform) {
    case 'html5':
      if (typeof foundImage === 'object') {
        context.eventContext.spaceContainer.extras.backgroundImage = foundImage
      }
      return null
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
