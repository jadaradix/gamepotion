import Action from '../Action.js'

class IfNot extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'IfNot'
    this.name = 'If Not'
    this.description = 'Conditionally does not run actions.'
    this.defaultRunArguments = new Map([
      ['Expression 1', {
        type: 'generic',
        value: ''
      }],
      ['Expression 2', {
        type: 'generic',
        value: ''
      }]
    ])
    this.indentation = 1
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      return (runArguments[0] !== runArguments[1])
    case 'nds':
      return `if(${runArguments[0]} != ${runArguments[1]}) {`
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    return `If ${runArguments[0]} is not ${runArguments[1]}`
  }
}

export default IfNot
