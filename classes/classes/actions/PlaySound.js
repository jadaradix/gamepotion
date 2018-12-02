import Action from '../Action.js'

class PlaySound extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'PlaySound'
    this.name = 'Play Sound'
    this.description = 'Plays a sound.'
    this.defaultRunArguments = new Map([
      ['Sound', {
        type: 'sound',
        value: ''
      }],
      ['Loop', {
        type: 'boolean',
        value: false
      }]
    ])
  }

  run(context, runArguments, appliesTo) {
    const foundSound = context.eventContext.resourceContainers.find(r => r.resource.id === runArguments[0])
    switch(context.platform) {
    case 'html5':
      if (typeof foundSound === 'object') {
        foundSound.extras.element.loop = runArguments[1]
        foundSound.extras.element.play()
      }
      return null
    case 'nds':
      return ''
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    if (runArguments[1] === true) {
      return `Play ${runArguments[0]} on loop`
    } else {
      return `Play ${runArguments[0]}`
    }
    
  }
}

export default PlaySound
