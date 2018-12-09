import Event from '../Event.js'

class Input extends Event {
  constructor(json = {}) {
    super(json)
    this.id = 'Input'
    this.name = 'Input'
    this.icon = 'input'
    this.defaultConfiguration = [
      {
        name: 'State',
        type: 'options',
        defaultValue: 'press',
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
      },
      {
        name: 'Key',
        type: 'options',
        defaultValue: 'secondary',
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
      }
    ]
    this.stateConfigurationValues = this.defaultConfiguration.find(v => v.name === 'State').values
    this.keyConfigurationValues = this.defaultConfiguration.find(v => v.name === 'Key').values
  }

  toString() {
    // console.warn('[action-Input] [toString] this.defaultConfiguration', this.defaultConfiguration)
    // console.warn('[action-Input] [toString] this.configuration', this.configuration)
    const state = this.stateConfiguration.find(v => v.id === this.configuration[1]).name
    const key = this.keyConfiguration.find(v => v.id === this.configuration[0]).name
    return `${state} ${key}`
  }
}

export default Input
