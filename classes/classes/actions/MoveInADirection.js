import Action from '../Action.js'

const functions = {
  'up'(instance, speed) {
    instance.props.vy = speed
  },
  'down'(instance, speed) {
    instance.props.vy = speed
  },
  'left'(instance, speed) {
    instance.props.vx = speed
  },
  'right'(instance, speed) {
    instance.props.vx = speed
  }
}

class MoveInADirection extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'MoveInADirection'
    this.name = 'Move in a direction'
    this.description = 'Moves the instance in a direction.'
    this.defaultRunArguments = new Map([
      ['Direction', {
        type: 'options',
        value: 'up',
        values: [
          {
            id: 'up',
            name: 'Up'
          },
          {
            id: 'down',
            name: 'Down'
          },
          {
            id: 'left',
            name: 'Left'
          },
          {
            id: 'right',
            name: 'Right'
          }
        ]
      }],
      ['Speed', {
        type: 'generic',
        value: '1'
      }]
    ])
    this.caresAboutAppliesTo = true
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      functions[runArguments[0]](context.instance, runArguments[1])
      return null
    case 'nds':
      return ''
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    if (appliesTo === 'other') {
      return `Move other instance ${runArguments[0]} at speed ${runArguments[1]}`
    }
    return `Move instance ${runArguments[0]} at speed ${runArguments[1]}`
  }
}

export default MoveInADirection
