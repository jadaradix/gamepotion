import Action from '../Action.js'

class CancelAlarm extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'CancelAlarm'
    this.name = 'Cancel alarm'
    this.description = 'Cancels an alarm.'
    this.defaultRunArguments = new Map([
      ['Name', {
        type: 'variable',
        value: ''
      }]
    ])
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      context.eventContext.alarms.set(runArguments[0], undefined)
      return null
    case 'nds':
      return `alarms[${runArguments[0]}] = NULL;`
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    return `Cancel alarm "${runArguments[0]}"`
  }
}

export default CancelAlarm
