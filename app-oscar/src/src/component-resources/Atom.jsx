import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { events, actions } from '../classes'
import icons from '../icons'

import Box from '../components/Box/Box'
import Dropper from '../components/Dropper/Dropper'
import List from '../components/List/List'
import FilterableList from '../components/FilterableList/FilterableList'
import ListItem from '../components/ListItem/ListItem'
import Image from '../components/Image/Image'
import Heading2 from '../components/Heading2/Heading2'
import Button from '../components/Button/Button'

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
      .component--list {
        margin-bottom: 1rem;
      }
      .component--button {
        width: 100%;
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
      currentEventIndex: (props.resource.events.length > 0 ? 0 : undefined),
      isEventDialogShowing: false,
      actionClassInstance: null,
      actionClassInstanceIsAdding: false
    }
    this.actionClassInstances = Object.keys(actions).map(k => {
      return new actions[k]()
    })

    this.onChooseImage = this.onChooseImage.bind(this)
    this.onChooseEvent = this.onChooseEvent.bind(this)
    this.actOnEvent = this.actOnEvent.bind(this)

    this.onChooseAddEvent = this.onChooseAddEvent.bind(this)
    this.onEventModalGood = this.onEventModalGood.bind(this)
    this.onEventModalBad = this.onEventModalBad.bind(this)

    this.onChooseAddAction = this.onChooseAddAction.bind(this)
    this.onActionModalGood = this.onActionModalGood.bind(this)
    this.onActionModalBad = this.onActionModalBad.bind(this)
    this.onActionModalUpdateArgument = this.onActionModalUpdateArgument.bind(this)
    this.actOnAction = this.actOnAction.bind(this)
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

  shouldComponentUpdate() {
    if (this.state.currentEventIndex === undefined) {
      this.setState({
        currentEventIndex: 0
      })
    }
    return true
  }

  onChooseAddAction(id) {
    const actionClassInstance = new actions[id]()
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
    if (isAdding === true) {
      const actionObject = {
        id: actionClassInstance.id,
        runArguments: actionClassInstance.runArguments,
        appliesTo: actionClassInstance.appliesTo
      }
      // console.warn('[component-resource-Atom] [onActionModalGood] actionObject', actionObject)
      this.onUpdate({
        events: this.props.resource.events.map((e, index) => {
          if (index === this.state.currentEventIndex) {
            e.actions.push(actionObject)
          }
          return e
        })
      })
    } else {
      this.onUpdate({
        events
      })
    }
    this.setState({
      actionClassInstance: null
    })
  }

  onActionModalBad() {
    this.setState({
      actionClassInstance: null
    })
  }

  onActionModalUpdateArgument() {
    const { actionClassInstance } = this.state
    this.setState({
      actionClassInstance
    })
  }

  actOnAction(id, thingThatCouldHappen) {
    id = parseInt(id, 10)
    const thingsThatCouldHappen = {
      'edit': () => {
        // console.warn('[component-resource-Atom] [actOnAction] id/thingThatCouldHappen', id, thingThatCouldHappen)
        const actualAction = this.props.resource.events[this.state.currentEventIndex].actions[id]
        const actionClassInstance = new actions[actualAction.id]()
        actionClassInstance.runArguments = actualAction.runArguments
        // console.log('[component-resource-Atom] [actOnAction] actionClassInstance', actionClassInstance)
        this.setState({
          actionClassInstance,
          actionClassInstanceIsAdding: false
        })
      },
      'delete': () => {
        this.onUpdate({
          events: this.props.resource.events.map((e, index) => {
            if (index === this.state.currentEventIndex) {
              e.actions = e.actions.filter((a, i) => {
                return (i !== id)
              })
            }
            return e
          })
        })
      }
    }
    const foundThingThatCouldHappen = thingsThatCouldHappen[thingThatCouldHappen]
    if (typeof foundThingThatCouldHappen === 'function') {
      thingsThatCouldHappen[thingThatCouldHappen]()
    }
  }

  onChooseAddEvent() {
    this.setState({
      isEventDialogShowing: true
    })
  }

  onChooseEvent(id) {
    id = parseInt(id, 10)
    this.setState({
      currentEventIndex: id
    })
  }

  actOnEvent(id, thingThatCouldHappen) {
    id = parseInt(id, 10)
    const thingsThatCouldHappen = {
      'delete': () => {
        this.onUpdate({
          events: this.props.resource.events.filter((e, i) => {
            return (i !== id)
          })
        })
      }
    }
    const foundThingThatCouldHappen = thingsThatCouldHappen[thingThatCouldHappen]
    if (typeof foundThingThatCouldHappen === 'function') {
      thingsThatCouldHappen[thingThatCouldHappen]()
    }
  }

  onEventModalGood(id, configuration) {
    // console.warn('[component-resource-Atom] [onEventModalGood]', id, configuration)
    this.setState(
      {
        isEventDialogShowing: false
      },
      () => {
        this.onUpdate({
          events: [
            ...this.props.resource.events,
            {
              id,
              configuration,
              actions: []
            }
          ]
        })
      }
    )
  }

  onEventModalBad() {
    this.setState({
      isEventDialogShowing: false
    })
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

    const currentEvent = this.props.resource.events[this.state.currentEventIndex]

    return (
      <StyledResource>
        {this.state.actionClassInstance !== null &&
          <ActionModal actionClassInstance={this.state.actionClassInstance} resources={this.props.resources} onGood={this.onActionModalGood} onBad={this.onActionModalBad} onUpdateArgument={this.onActionModalUpdateArgument} />
        }
        {this.state.isEventDialogShowing &&
          <EventModal
            onGood={this.onEventModalGood}
            onBad={this.onEventModalBad}
          />
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
            <List emptyText='There aren&rsquo;t any events.'>
              {this.props.resource.events.map((event, eventIndex) => {
                // console.warn('[component-resource-Atom] [render] event.id', event.id)
                const eventClass = new events[event.id]()
                eventClass.configuration = event.configuration
                return <ListItem
                  id={eventIndex}
                  key={eventIndex}
                  icon={icons.events[eventClass.icon]}
                  selected={eventIndex === this.state.currentEventIndex}
                  actions={['delete']}
                  onChoose={this.onChooseEvent}
                  onAction={this.actOnEvent}
                >
                  {eventClass.toString()}
                </ListItem>
              })}
            </List>
            <Button onClick={this.onChooseAddEvent}>Add event</Button>
          </Box>
        </section>
        {currentEvent &&
          <section className='actions'>
            <Box className='actions'>
              <Heading2>Actions</Heading2>
              <ActionsList resources={this.props.resources} actions={currentEvent.actions} actionClassInstances={this.actionClassInstances} onAction={this.actOnAction} />
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
        }
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
