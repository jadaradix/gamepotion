import React, { Component } from 'react'
import PropTypes from 'prop-types'

import RenderGameSpace from './RenderGameSpace.js'

class Oscar2 extends Component {
  constructor(props) {
    super(props)
    this.gameSpaceFunctions = this.loadGameSpace(this.props.project.startSpace, this.props.resources)
    this.onSwitchSpace = this.onSwitchSpace.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    if (
      nextProps.project !== this.props.project ||
      nextProps.resources !== this.props.resources
    ) {
      this.gameSpaceFunctions = this.loadGameSpace(nextProps.project.startSpace, nextProps.resources)
    }
    return false
  }

  componentWillUnmount () {
    if (typeof this.gameSpaceFunctions === 'object') {
      this.gameSpaceFunctions.free()
    }
  }

  loadGameSpace(spaceId, resources) {
    if (typeof this.gameSpaceFunctions === 'object') {
      this.gameSpaceFunctions.free()
    }

    const foundSpace = resources.find(r => {
      return (r.type === 'space' && r.id === spaceId)
    })
    if (foundSpace === undefined) {
      console.error('[Oscar2] [loadGameSpace] foundSpace is undefined, returning')
      return
    }

    const spaceContainer = {
      resource: foundSpace,
      extras: {}
    }
    const resourceContainers = resources.map(resource => {
      return {
        resource,
        extras: {}
      }
    })
    const variables = new Map()

    const canvasElement = document.createElement('canvas')
    setTimeout(() => {
      document.getElementById(this.props.containerElementId).appendChild(canvasElement)
    }, 0)

    return RenderGameSpace({
      canvasElement,
      spaceContainer,
      resourceContainers,
      variables,
      onSwitchSpace: this.onSwitchSpace,
    })
  }

  onSwitchSpace(id) {
    console.warn('[Oscar2] [onSwitchSpace]', id)
    this.gameSpaceFunctions = this.loadGameSpace(id, this.props.resources)
  }

  render() {
    return null
  }
}


Oscar2.propTypes = {
  containerElementId: PropTypes.string.isRequired,
  project: PropTypes.any.isRequired,
  resources: PropTypes.array.isRequired
}

Oscar2.defaultProps = {
}

export default Oscar2
