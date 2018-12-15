import Action from '../Action.js'

class SetAlarm extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'SetAlarm'
    this.name = 'Set alarm'
    this.description = 'Sets an alarm.'
    this.defaultRunArguments = new Map([
      ['Name', {
        type: 'generic',
        value: ''
      }],
      ['Time (seconds)', {
        type: 'generic',
        value: '5'
      }]
    ])
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      context.eventContext.alarms.set(runArguments[0], runArguments[1])
      return null
    case 'nds':
      return `alarms[${runArguments[0]}] = ${runArguments[1]};`
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    return `Set alarm "${runArguments[0]}" to ${runArguments[1]}s`
  }
}

export default SetAlarm
