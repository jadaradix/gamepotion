import Action from '../Action.js'

class MoveCamera extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'MoveCamera'
    this.name = 'Move Camera'
    this.description = 'Moves the camera.'
    this.defaultRunArguments = new Map([
      ['X', {
        type: 'generic',
        value: ''
      }],
      ['Y', {
        type: 'generic',
        value: ''
      }]
    ])
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      context.eventContext.spaceContainer.resource.camera.x = runArguments[0]
      context.eventContext.spaceContainer.resource.camera.y = runArguments[1]
      return null
    case 'nds':
      return ''
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    return `Move camera to ${runArguments[0]}, ${runArguments[1]}`
  }
}

export default MoveCamera
