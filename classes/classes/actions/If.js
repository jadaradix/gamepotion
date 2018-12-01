import Action from '../Action.js'

class If extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'If'
    this.name = 'If'
    this.description = 'Conditionally runs actions.'
    this.defaultRunArguments = new Map([
      ['Expression 1', {
        type: 'generic',
        value: ''
      }],
      ['Expression 2', {
        type: 'generic',
        value: ''
      }],
      ['Not', {
        type: 'boolean',
        value: false
      }]
    ])
    this.indentation = 1
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      if (runArguments[0]) {
        return (runArguments[0] !== runArguments[1])
      } else {
        return (runArguments[0] === runArguments[1])
      }
      
    case 'nds':
      return `if(${runArguments[0]} ${runArguments[2] ? '!=' : '=='} ${runArguments[1]}) {`
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    const comparator = (runArguments[2] ? 'is not' : 'is')
    return `If ${runArguments[0]} ${comparator} ${runArguments[1]}`
  }
}

export default If
