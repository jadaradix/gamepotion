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
    switch(context.platform) {
    case 'html5':
      return {
        actionBack: 'SOUND_PLAY',
        actionBackArguments: [
          runArguments[0],
          runArguments[1]
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
    if (runArguments[1] === true) {
      return `Play ${runArguments[0]} on loop`
    } else {
      return `Play ${runArguments[0]}`
    }
    
  }
}

export default PlaySound
