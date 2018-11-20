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
      }]
    ])
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      return {
        actionBack: 'SOUND_PLAY',
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
    return `Play ${runArguments[0]}`
  }
}

export default PlaySound
