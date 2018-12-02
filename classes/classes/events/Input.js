import Event from '../Event.js'

class Input extends Event {
  constructor(json = {}) {
    super(json)
    this.id = 'input'
    this.name = 'Input'
    this.icon = 'input'
    this.defaultConfiguration = [
      {
        name: 'Key',
        type: 'options',
        values: [
          {
            id: 'primary',
            name: 'Primary'
          },
          {
            id: 'secondary',
            name: 'Secondary'
          },
          {
            id: 'left',
            name: 'Left'
          },
          {
            id: 'right',
            name: 'Right'
          }
        ]
      },
      {
        name: 'State',
        type: 'options',
        values: [
          {
            id: 'press',
            name: 'Press'
          },
          {
            id: 'hold',
            name: 'Hold'
          }
        ]
      }
    ]
  }

  toString() {
    const key = this.defaultConfiguration.find(v => v.name === 'Key').values.find(v => v.id === this.configuration[0]).name
    const state = this.defaultConfiguration.find(v => v.name === 'State').values.find(v => v.id === this.configuration[1]).name
    return `${state} ${key}`
  }
}

export default Input
