import Action from '../Action.js'

const operators = {
  '=': {
    'html5'(e1, e2) {
      return (e1 === e2)
    },
    'nds'(e1, e2) {
      return `if (${e1} == ${e2}) {`
    }
  },
  '!=': {
    'html5'(e1, e2) {
      return (e1 !== e2)
    },
    'nds'(e1, e2) {
      return `if (${e1} != ${e2}) {`
    }
  }
}

class If extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'If'
    this.name = 'If'
    this.description = 'Conditionally runs actions.'
    this.defaultRunArguments = new Map([
      ['Expression1', {
        name: '',
        type: 'generic',
        value: ''
      }],
      ['Operator', {
        name: '',
        type: 'options',
        value: '=',
        values: [
          {
            id: '=',
            name: 'is'
          },
          {
            id: '!=',
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
    this.operatorConfigurationValues = this.defaultRunArguments.get('Operator').values
  }

  run(context, runArguments, appliesTo) {
    return operators[runArguments[1]][context.platform](runArguments[0], runArguments[2])
  }

  toString(runArguments, appliesTo) {
    const comparator = this.operatorConfigurationValues.find(v => v.id === runArguments[1]).name
    return `If ${runArguments[0]} ${comparator} ${runArguments[2]}`
  }
}

export default If
