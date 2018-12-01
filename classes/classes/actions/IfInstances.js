import Action from '../Action.js'

class IfInstances extends Action {
  constructor(json = {}) {
    super(json)
    this.id = 'IfInstances'
    this.name = 'If Instances'
    this.description = 'Conditionally runs actions when there is a number of instances.'
    this.defaultRunArguments = new Map([
      ['Atom', {
        type: 'atom',
        value: ''
      }],
      ['Count', {
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
    const getInstanceCount = (atomId) => {
      return context.eventContext.instanceClasses
        .filter(ic => (ic.atomContainer.resource.id === atomId))
        .length
    }
    const instanceCount = getInstanceCount(runArguments[0])
    switch(context.platform) {
    case 'html5':
      if (runArguments[2]) {
        return (instanceCount !== runArguments[1])
      } else {
        return (instanceCount === runArguments[1])
      }
    case 'nds':
      return `if(getInstanceCount("${runArguments[0]}") ${runArguments[2] ? '!=' : '=='} ${runArguments[1]}) {`
    default:
      return null
    }
  }

  toString(runArguments, appliesTo) {
    if (runArguments[1] === 1) {
      const comparator = (runArguments[2] ? 'is not' : 'is')
      return `If there ${comparator} 1 instance of ${runArguments[0]}`
    } else {
      const comparator = (runArguments[2] ? 'are not' : 'are')
      return `If there ${comparator} ${runArguments[1]} instances of ${runArguments[0]}`
    }
  }
}

export default IfInstances
