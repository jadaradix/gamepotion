import React, {PureComponent} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { events } from '../classes'
import icons from '../icons'

import Modal from '../components/Modal/Modal'
import Heading1 from '../components/Heading1/Heading1'
import List from '../components/List/List'
import ListItem from '../components/ListItem/ListItem'
import Button from '../components/Button/Button'

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

const getConfiguration = (name, type, options = [], value, onUpdate, onGood) => {
  const key = `${type}-${name}`
  switch (type) {
  case 'options':
    return <Dropper key={key} options={options} value={value} label={name} onChoose={onUpdate} />
  default:
    return <Input key={key} label={name} value={value} onChange={onUpdate} onDone={onGood} />
  }
}

class EventModal extends PureComponent {
  constructor(props) {
    super(props)
    this.eventClasses = Object.keys(events).map(k => {
      return new events[k]()
    })
    const eventClass = this.eventClasses.find(ec => ec.id === this.props.id)
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
    const configuration = eventClass.defaultConfiguration.map(dc => dc.defaultValue)
    if (configuration.length === 0) {
      return this.props.onGood(eventClass.id, configuration)
    }
    this.setState({
      eventClass,
      configuration
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
          <Heading1>Add event</Heading1>
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
              return getConfiguration(dc.name, dc.type, dc.values, this.state.eventClass.configuration[dci], (v) => this.onChangeConfiguration(dci, v), this.handleOnGood)
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
  configuration: PropTypes.array,
  onGood: PropTypes.func,
  onBad: PropTypes.func
}

EventModal.defaultProps = {
  id: 'Create',
  configuration: null,
  onGood: () => {},
  onBad: () => {}
}

export default EventModal
