import Action from '../Action.js'

class Create extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'Create'
    this.name = 'Create Atom'
    this.description = 'Creates an atom.'
    this.defaultRunArguments = new Map([
      ['Atom', {
        type: 'atom',
        value: ''
      }],
      ['X', {
        type: 'number',
        value: ''
      }],
      ['Y', {
        type: 'number',
        value: ''
      }]
    ])
  }

  run(context, runArguments, appliesTo) {
    switch(context.platform) {
    case 'html5':
      return {
        actionBack: 'INSTANCE_CREATE',
        actionBackArguments: [context.instance],
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
