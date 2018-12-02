import Action from '../Action.js'

class Create extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'Create'
    this.name = 'Create'
    this.description = 'Creates an instance.'
    this.defaultRunArguments = new Map([
      ['Atom', {
        type: 'atom',
        value: ''
      }],
      ['X', {
        type: 'generic',
        value: ''
      }],
      ['Y', {
        type: 'generic',
        value: ''
      }]
    ])
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      return {
        actionBack: 'INSTANCE_CREATE',
        actionBackArguments: [
          runArguments[0],
          runArguments[1],
          runArguments[2]
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
    return `Create ${runArguments[0]} at ${runArguments[1]}, ${runArguments[2]}`
  }
}

export default Create
