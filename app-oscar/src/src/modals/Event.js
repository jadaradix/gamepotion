import React, {PureComponent} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import resourceTypes from '../resourceTypes'
import { events } from '../classes'
import icons from '../icons'

import Modal from '../components/Modal/Modal'
import Heading1 from '../components/Heading1/Heading1'
import List from '../components/List/List'
import ListItem from '../components/ListItem/ListItem'
import Button from '../react-components/Button/Button'

import Dropper from '../components/Dropper/Dropper'
import Input from '../components/Input/Input'

const StyledModal = styled.div`
  .component--modal {
    .component--heading1 {
      margin-bottom: 2rem;
    }
    .component--list {
      margin-bottom: 2rem;
    }
    .configuration {
      margin-bottom: 2rem;
      .component--dropper:not(:last-child) {
        margin-bottom: 1rem;
      }
      .component--input:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
    .decision {
      // background-color: green;
    }
  }
`

class EventModal extends PureComponent {
  constructor(props) {
    super(props)
    this.eventClasses = Object.keys(events).map(k => {
      return new events[k]()
    })
    this.resourcesByType = {}
    resourceTypes.forEach(rt => {
      this.resourcesByType[rt.type] = props.resources
        .filter(r => r.type === rt.type)
        .map(r => {
          return {
            id: r.id,
            name: r.name
          }
        })
    })
    const eventClass = this.eventClasses.find(ec => ec.id === props.id)
    if (Array.isArray(this.props.configuration)) {
      eventClass.configuration = this.props.configuration
    } else {
      eventClass.configuration = eventClass.defaultConfiguration.map(dc => {
        if (typeof this.resourcesByType[dc.type] === 'object' && this.resourcesByType[dc.type].length > 0) {
          return this.resourcesByType[dc.type][0].id
        }
        return dc.defaultValue
      })
    }
    this.configurations = [
      {
        type: 'generic',
        render: (name, values = [], value, onUpdate, onGood) => {
          const key = `default-${name}`
          return <Input key={key} label={name} value={value} onChange={onUpdate} onDone={onGood} />
        }
      },
      {
        type: 'options',
        render: (name, values = [], value, onUpdate, onGood) => {
          const key = `options-${name}`
          return <Dropper key={key} options={values} value={value} label={name} onChoose={onUpdate} />
        }
      },
      ...resourceTypes.map(rt => {
        return {
          type: rt.type,
          render: (name, values = [], value, onUpdate, onGood) => {
            const key = `resource-type-${rt.name}`
            return <Dropper key={key} options={this.resourcesByType[rt.type]} value={value} label={rt.label} onChoose={onUpdate} />
          }
        }
      })
    ]
    this.state = {
      eventClass
    }
    // console.warn('[EventModal] [constructor] this.state', this.state)
    this.onChooseEvent = this.onChooseEvent.bind(this)
    this.onChangeConfiguration = this.onChangeConfiguration.bind(this)
    this.handleOnGood = this.handleOnGood.bind(this)
  }

  onChooseEvent(id) {
    const eventClass = this.eventClasses.find(ec => ec.id === id)
    eventClass.configuration = eventClass.defaultConfiguration.map(dc => {
      if (typeof this.resourcesByType[dc.type] === 'object' && this.resourcesByType[dc.type].length > 0) {
        return this.resourcesByType[dc.type][0].id
      }
      return dc.defaultValue
    })
    if (eventClass.configuration.length === 0) {
      return this.props.onGood(eventClass.id, eventClass.configuration)
    }
    this.setState({
      eventClass
    })
  }

  onChangeConfiguration(index, value) {
    const { eventClass} = this.state
    eventClass.configuration = eventClass.configuration.map((c, i) => {
      if (i === index) {
        c = value
      }
      return c
    })
    this.setState({
      eventClass
    })
  }

  handleOnGood() {
    this.props.onGood(this.state.eventClass.id, this.state.eventClass.configuration)
  }

  render() {
    return (
      <StyledModal>
        <Modal onClose={this.props.onBad}>
          <Heading1>{this.props.isAdding ? 'Add' : 'Edit'} event</Heading1>
          <List>
            {this.eventClasses.map(ec => {
              return (
                <ListItem
                  key={ec.id}
                  id={ec.id}
                  icon={icons.events[ec.icon]}
                  selected={this.state.eventClass.id === ec.id}
                  onChoose={this.onChooseEvent}
                >
                  {ec.name}
                </ListItem>
              )
            })}
          </List>
          <div className='configuration'>
            {this.state.eventClass.defaultConfiguration.map((dc, dci) => {
              const foundConfiguration = this.configurations.find(c => c.type === dc.type)
              return foundConfiguration.render(dc.name, dc.values, this.state.eventClass.configuration[dci], (v) => this.onChangeConfiguration(dci, v), this.handleOnGood)
            })}
          </div>
          <div className='decision'>
            <Button onClick={this.handleOnGood}>Done</Button>
          </div>
        </Modal>
      </StyledModal>
    )
  }
}

EventModal.propTypes = {
  id: PropTypes.string,
  isAdding: PropTypes.bool,
  resources: PropTypes.array.isRequired,
  configuration: PropTypes.array,
  onGood: PropTypes.func,
  onBad: PropTypes.func
}

EventModal.defaultProps = {
  id: 'Create',
  isAdding: true,
  configuration: null,
  onGood: () => {},
  onBad: () => {}
}

export default EventModal
