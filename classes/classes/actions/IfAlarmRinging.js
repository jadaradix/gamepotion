import Action from '../Action.js'

class IfAlarmRinging extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'IfAlarmRinging'
    this.name = 'If an alarm is ringing'
    this.description = 'If an alarm is ringing.'
    this.defaultRunArguments = new Map([
      ['Name', {
        type: 'variable',
        value: ''
      }]
    ])
    this.indentation = 1
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      return (context.eventContext.alarms.get(runArguments[0]) === 0)
    case 'nds':
      return ''
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    return `If alarm "${runArguments[0]}" is ringing`
  }
}

export default IfAlarmRinging
