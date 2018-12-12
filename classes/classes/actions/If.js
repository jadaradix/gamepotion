import Action from '../Action.js'

class If extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'If'
    this.name = 'If'
    this.description = 'Conditionally runs actions.'
    this.defaultRunArguments = new Map([
      ['Expression1', {
        name: 'If',
        type: 'generic',
        value: ''
      }],
      ['Operator', {
        name: '',
        type: 'options',
        value: 'is',
        options: [
          {
            id: 'is',
            name: 'is'
          },
          {
            id: 'isNot',
            name: 'is not'
          }
        ]
      }],
      ['Expression2', {
        name: '',
        type: 'generic',
        value: ''
      }]
    ])
    this.indentation = 1
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      if (runArguments[2]) {
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
