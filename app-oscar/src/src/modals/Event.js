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

const StyledModal = styled.div`
  .component--modal {
    .component--heading1 {
      margin-bottom: 2rem;
    }
    .component--list {
      margin-bottom: 1rem;
    }
    .decision {
      // background-color: green;
    }
  }
`

class EventModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      configuration: this.props.configuration
    }
    this.eventClasses = Object.keys(events).map(k => {
      return new events[k]()
    })
    this.onChooseEvent = this.onChooseEvent.bind(this)
  }

  onChooseEvent(id) {
    this.setState({
      id
    })
  }

  render() {
    return (
      <StyledModal>
        <Modal onClose={this.props.onBad}>
          <Heading1>Add event</Heading1>
          <List>
            {this.eventClasses.map(ec => {
              return (
                <ListItem key={ec.id} id={ec.id} icon={icons.events[ec.icon]} onChoose={this.onChooseEvent}>{ec.name}</ListItem>
              )
            })}
          </List>
          <div className='decision'>
            <Button onClick={() => this.props.onGood(this.state.id, this.state.configuration)}>Done</Button>
          </div>
          {/* <p>id: {this.state.id}</p> */}
        </Modal>
      </StyledModal>
    )
  }
}

// const EventModal = ({ id = '', configuration = [] }) => {

//   const getArgument = (index, name, type, value) => {
//     const handleOnUpdateArgument = (v) => {
//       return onUpdateArgument(index, v)
//     }
//     if (actionClassInstance.runArguments[index].length === 0 && resourcesByType.hasOwnProperty(type)) {
//       if (resourcesByType[type].length > 0) {
//         actionClassInstance.runArguments[index] = resourcesByType[type][0].id
//       } else {
//         actionClassInstance.runArguments[index] = '?'
//       }
//     }
//     if (resourcesByType.hasOwnProperty(type)) {
//       return <Dropper onChoose={handleOnUpdateArgument} label={name} value={value} options={resourcesByType[type]} />
//     }
//     switch (type) {
//     case 'boolean':
//       return <Switch onChange={handleOnUpdateArgument} checked={value}>{name}</Switch>
//     case 'generic':
//     case 'number':
//     default:
//       return <Input onChange={handleOnUpdateArgument} label={name} value={value} onDone={() => onGood(actionClassInstance)} />
//     }
//   }
// }

EventModal.propTypes = {
  id: PropTypes.string,
  configuration: PropTypes.array,
  onGood: PropTypes.func,
  onBad: PropTypes.func
}

EventModal.defaultProps = {
  id: 'Create',
  configuration: [],
  onGood: () => {},
  onBad: () => {}
}

export default EventModal
