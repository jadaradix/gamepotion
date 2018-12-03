import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import classes from '../classes'

import { font, colours } from '../styleAbstractions'
import icons from '../icons'

import Box from '../components/Box/Box'
import Dropper from '../components/Dropper/Dropper'
import List from '../components/List/List'
import FilterableList from '../components/FilterableList/FilterableList'
import ListItem from '../components/ListItem/ListItem'
import Image from '../components/Image/Image'
import Heading2 from '../components/Heading2/Heading2'

import ActionModal from '../modals/Action'
import EventModal from '../modals/Event'
import ActionsList from '../component-instances/ActionsList'

const StyledResource = styled.div`
  section.image-events {
    .component--box.image {
      .image-container {
        position: relative;
        height: 128px;
        border: 1px solid #dadfe1;
        border-radius: 4px;
      }
      .image-container + .component--dropper {
        margin-top: 1rem;
      }
    }
    .component--box.events {
      margin-top: 1rem;
      margin-bottom: 2rem;
      padding: 1rem;
      .component--heading2 {
        margin-bottom: 1rem;
      }
      // background-color: yellow;
    }
  }
  section.actions {
    // background-color: red;
    .component--box.actions {
      padding: 1rem;
      .component--heading2 {
        margin-bottom: 1rem;
      }
      .no-actions {
        padding-top: 2rem;
        padding-bottom: 2rem;
        ${font}
        text-align: center;
        color: ${colours.fore};
        opacity: 0.5;
        // background-color: navy;
      }
    }
    .component--box.add-action {
      margin-top: 1rem;
      padding: 1rem;
      .component--heading2 {
        margin-bottom: 1rem;
      }
    }
  }
  @media screen and (min-width: 960px) {
    section.image-events {
      float: left;
      width: 240px;
      .component--box.events {
        margin-top: 2rem;
      }
    }
    section.actions {
      margin-top: 0;
      margin-left: calc(240px + 2rem);
      .component--box.add-action {
        margin-top: 2rem;
      }
    }
  }
`

class ResourceAtom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentEvent: undefined,
      actionClassInstance: null,
      actionClassInstanceIsAdding: false
    }

    this.onChooseImage = this.onChooseImage.bind(this)
    this.onChooseEvent = this.onChooseEvent.bind(this)
    this.onChooseAddAction = this.onChooseAddAction.bind(this)
    this.onActionModalGood = this.onActionModalGood.bind(this)
    this.onActionModalBad = this.onActionModalBad.bind(this)
    this.onActionModalUpdateArgument = this.onActionModalUpdateArgument.bind(this)
    this.actOnAction = this.actOnAction.bind(this)
    this.actionClassInstances = Object.keys(classes.actions).map(k => {
      return new classes.actions[k]()
    })

    this.onEventModalGood = this.onEventModalGood.bind(this)
    this.onEventModalGood = this.onEventModalGood.bind(this)
  }

  onUpdate(data) {
    this.props.onUpdate(data)
  }

  onChooseImage(imageId) {
    if (imageId === 'none') {
      imageId = null
    }
    this.onUpdate({
      imageId
    })
  }

  onChooseEvent(currentEvent) {
    this.setState({
      currentEvent
    })
  }

  onChooseAddAction(id) {
    const actionClassInstance = new classes.actions[id]()
    // console.log('[component-resource-Atom] [onChooseAddAction] actionClassInstance', actionClassInstance)
    const argumentsCount = actionClassInstance.defaultRunArguments.size
    actionClassInstance.defaultRunArguments.forEach((v) => {
      actionClassInstance.runArguments.push(v.value)
    })
    if (argumentsCount === 0 && actionClassInstance.caresAboutAppliesTo === false) {
      return this.setState(
        {
        actionClassInstanceIsAdding: true
        },
        () => {
          this.onActionModalGood(actionClassInstance)
        }
      )
    }
    this.setState({
      actionClassInstance,
      actionClassInstanceIsAdding: true
    })
  }

  onActionModalGood(actionClassInstance) {
    const isAdding = this.state.actionClassInstanceIsAdding
    let events = {}
    if (isAdding === true) {
      const actionObject = {
        id: actionClassInstance.id,
        runArguments: actionClassInstance.runArguments,
        appliesTo: 'this'
      }
      console.warn('[component-resource-Atom] [onActionModalGood] actionObject', actionObject)
      events = {
        ...this.props.resource.events,
        [this.state.currentEvent]: {
          ...this.props.resource.events[this.state.currentEvent],
          actions: [
            ...this.props.resource.events[this.state.currentEvent].actions,
            actionObject
          ] 
        }
      }
    } else {
      events = this.props.resource.events
    }
    this.onUpdate({
      events
    })
    this.setState({
      actionClassInstance: null
    })
  }

  onActionModalBad() {
    this.setState({
      actionClassInstance: null
    })
  }

  onEventModalGood() {
  
  }

  onEventModalBad() {
  
  }

  onActionModalUpdateArgument() {
    const { actionClassInstance } = this.state
    this.setState({
      actionClassInstance
    })
  }

  actOnAction(id, action) {
    id = parseInt(id, 10)
    const actions = {
      'edit': () => {
        console.warn('[component-resource-Atom] [actOnAction] id, action', id, action)
        const actualAction = this.props.resource.events[this.state.currentEvent][id]
        const actionClassInstance = new classes.actions[actualAction.id]()
        actionClassInstance.runArguments = actualAction.runArguments
        console.log('[component-resource-Atom] [actOnAction] actionClassInstance', actionClassInstance)
        this.setState({
          actionClassInstance,
          actionClassInstanceIsAdding: false
        })
      },
      'delete': () => {
        this.onUpdate({
          events: {
            ...this.props.resource.events,
            [this.state.currentEvent]: {
              ...this.props.resource.events[this.state.currentEvent],
              actions: this.props.resource.events[this.state.currentEvent].actions.filter((a, i) => {
                return (i !== id)
              })
            }
          }
        })
      }
    }
    const foundAction = actions[action]
    if (typeof foundAction === 'function') {
      actions[action]()
    }
  }

  render() {
    const imageResources = [
      ...this.props.resources
        .filter(r => r.type === 'image')
        .map(r => {
          return {
            id: r.id,
            name: r.name
          }
        }),
      {
        id: 'none',
        name: '<None>'
      }
    ]

    const imageId = (this.props.resource.imageId === null ? 'none' : this.props.resource.imageId)
    const foundImageResource = this.props.resources.find(r => r.id === this.props.resource.imageId)

    const imageSrc = (foundImageResource !== undefined ?
      foundImageResource.getRemoteUrl()
      :
      null
    )

    // if (this.state.actionClassInstance) {
    //   console.warn('[component-resource-Atom] [render] this.state.actionClassInstance.defaultRunArguments', this.state.actionClassInstance.defaultRunArguments)
    //   console.warn('[component-resource-Atom] [render] this.state.actionClassInstance.defaultRunArguments.keys()', this.state.actionClassInstance.defaultRunArguments.keys())
    // }
    // const events = Object.values(classes.events).map(eventClass => new eventClass())

    const currentEvent = this.props.resource.events[this.state.currentEvent]
    const currentEventActions = (typeof currentEvent === 'object' ? currentEvent.actions : [])

    return (
      <StyledResource>
        {this.state.actionClassInstance !== null &&
          <ActionModal actionClassInstance={this.state.actionClassInstance} resources={this.props.resources} onGood={this.onActionModalGood} onBad={this.onActionModalBad} onUpdateArgument={this.onActionModalUpdateArgument} />
        }
        <section className='image-events'>
          <Box className='image'>
            <div className='image-container'>
              <Image src={imageSrc} />
            </div>
            <Dropper options={imageResources} value={imageId} onChoose={this.onChooseImage} />
          </Box>
          <Box className='events'>
            <Heading2>Events</Heading2>
            <List>
              {Object.keys(this.props.resource.events).map(eventId => {
                console.warn('eventId', eventId)
                const eventClass = new classes.events[eventId]()
                return <ListItem
                  id={eventClass.id}
                  key={eventClass.id}
                  icon={icons.events[eventClass.icon]}
                  selected={eventClass.id === this.state.currentEvent}
                  onChoose={this.onChooseEvent}
                >
                  {eventClass.toString()}
                </ListItem>
              })}
            </List>
            <Button onClick={}>Add event</Button>
          </Box>
        </section>
        <section className='actions'>
          <Box className='actions'>
            <Heading2>Actions</Heading2>
            <ActionsList resources={this.props.resources} actions={currentEventActions} actionClassInstances={this.actionClassInstances} onAction={this.actOnAction} />
          </Box>
          <Box className='add-action'>
            <Heading2>Add an action</Heading2>
            <FilterableList>
              {this.actionClassInstances.map(a => {
                return <ListItem id={a.id} key={a.id} actions={['add']} onAction={(id, action) => this.onChooseAddAction(id)} icon={icons.actions[a.id]} onChoose={this.onChooseAddAction}>{a.name}</ListItem>
              })}
            </FilterableList>
          </Box>
        </section>
      </StyledResource>
    )
  }
}

ResourceAtom.propTypes = {
  resources: PropTypes.array,
  resource: PropTypes.object.isRequired,
  onUpdate: PropTypes.func
}

ResourceAtom.defaultProps = {
  onUpdate: () => {}
}

export default ResourceAtom
