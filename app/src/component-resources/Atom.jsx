import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { font, colours } from '../styleAbstractions'
import icons from '../icons'
import events from '../atomEvents'

import Box from '../components/Box/Box'
import Dropper from '../components/Dropper/Dropper'
import List from '../components/List/List'
import ListItem from '../components/ListItem/ListItem'
import Image from '../components/Image/Image'
import Heading2 from '../components/Heading2/Heading2'

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
      padding: 1rem;
      .component--heading2 {
        margin-bottom: 1rem;
      }
      // background-color: yellow;
    }
  }
  section.actions {
    margin-top: 1rem;
    // background-color: red;
    .component--box.actions {
      padding: 1rem;
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

class ResourceAtom extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      resource: props.resource,
      currentEvent: 'create'
    }
    this.onChooseImage = this.onChooseImage.bind(this)
    this.onChooseEvent = this.onChooseEvent.bind(this)
    this.actOnAction = this.actOnAction.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      resource: nextProps.resource
    })
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

  actOnAction(id, action) {
    id = parseInt(id, 10)
    const actions = {
      'delete': () => {
        this.onUpdate({
          events: {
            ...this.state.resource.events,
            [this.state.currentEvent]: this.state.resource.events[this.state.currentEvent].filter((a, i) => {
              return (i !== id)
            })
          }
        })
      }
    }
    const foundAction = actions[action]
    if (typeof foundAction === 'function') {
      actions[action]()
    }
  }

  getEventActions() {
    const getEmpty = () => {
      return (
        <p className='no-actions'>There aren&rsquo;t any actions for this event.</p>
      )
    }
    const getList = (actions) => {
      return (
        <List>
          {actions.map((a, i) => {
            return (<ListItem id={`${i}`} key={`${i}`} icon={icons.actions[a.name]} actions={['edit', 'delete']} onAction={this.actOnAction}>{a.name} {a.runArguments.join(', ')}</ListItem>)
          })}
        </List>
      )
    }
    const keyActions = this.state.resource.events[this.state.currentEvent]
    if (Array.isArray(keyActions) === false) {
      this.state.resource.events[this.state.currentEvent] = []
    }
    if (this.state.resource.events[this.state.currentEvent].length > 0) {
      return getList(this.state.resource.events[this.state.currentEvent])
    } else {
      return getEmpty()
    }
  }

  render() {
    // console.warn('[resource-Atom] [render] this.state.resource', this.state.resource)
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

    const imageId = (this.state.resource.imageId === null ? 'none' : this.state.resource.imageId)
    const foundImageResource = this.props.resources.find(r => r.id === this.state.resource.imageId)

    const imageSrc = (foundImageResource !== undefined ?
      foundImageResource.getRemoteUrl()
      :
      null
    )

    return (
      <StyledResource>
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
              {events.map(e => {
                return <ListItem id={e.id} key={e.id} icon={icons.events[e.icon]} onChoose={this.onChooseEvent} selected={e.id === this.state.currentEvent}>{e.name}</ListItem>
              })}
            </List>
          </Box>
        </section>
        <section className='actions'>
          <Box className='actions'>
            {this.getEventActions()}
          </Box>
          <Box className='add-action'>
            <Heading2>Add action</Heading2>
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
