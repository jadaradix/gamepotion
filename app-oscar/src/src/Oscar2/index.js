import React, { Component } from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'

import RenderGameSpace from './RenderGameSpace.js'

class Oscar2 extends Component {
  constructor(props) {
    super(props)
    this.loadGameSpace(this.props.spaceId, this.props.resources)
      .then(gameSpaceFunctions => {
        this.gameSpaceFunctions = gameSpaceFunctions 
      })
    this.debouncedShouldComponentUpdate = debounce((spaceId, resources) => {
      this.free()
      this.loadGameSpace(spaceId, resources)
        .then(gameSpaceFunctions => {
          this.gameSpaceFunctions = gameSpaceFunctions 
        })
    }, 200)
    this.onSwitchSpace = this.onSwitchSpace.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    this.debouncedShouldComponentUpdate(nextProps.spaceId, nextProps.resources)
    return false
  }

  free() {
    if (typeof this.gameSpaceFunctions === 'object') {
      this.gameSpaceFunctions.free()
    }
    const containerElement = document.getElementById(this.props.containerElementId)
    while (containerElement.firstChild) {
      containerElement.removeChild(containerElement.firstChild)
    }
  }

  componentWillUnmount () {
    this.free()
  }

  loadGameSpace(spaceId, resources) {
    const foundSpace = resources.find(r => {
      return (r.type === 'space' && r.id === spaceId)
    })
    if (foundSpace === undefined) {
      return Promise.reject('foundSpace is undefined, returning')
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

    // http://localhost:3000/projects/6b5bee91-26c2-4200-90bf-dcc8596547c4/resources/616b76c2-bbbb-44cc-a286-e6ed41b2cd73
    const logic = () => {
      this.containerElement = document.getElementById(this.props.containerElementId)
      if (this.containerElement == null) {
        throw new Error(`could not find element with id ${this.props.containerElementId}`)
      }
      const canvasElement = document.createElement('canvas')
      this.containerElement.appendChild(canvasElement)
      return RenderGameSpace({
        canvasElement,
        spaceContainer,
        resourceContainers,
        variables,
        onSwitchSpace: this.onSwitchSpace,
        designMode: this.props.designMode,
        gridOn: this.props.gridOn,
        gridWidth: this.props.gridWidth,
        gridHeight: this.props.gridHeight,
        onTouch: this.props.onTouch,
        onTouchSecondary: this.props.onTouchSecondary,
      })
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve(logic()), 0)
    })
  }

  onSwitchSpace(id) {
    console.warn('[Oscar2] [onSwitchSpace]', id)
    this.free()
    this.loadGameSpace(id, this.props.resources)
      .then(gameSpaceFunctions => {
        this.gameSpaceFunctions = gameSpaceFunctions
      })
  }

  render() {
    return null
  }
}

Oscar2.propTypes = {
  containerElementId: PropTypes.string.isRequired,
  project: PropTypes.any.isRequired,
  resources: PropTypes.array.isRequired,
  spaceId: PropTypes.string.isRequired,
  designMode: PropTypes.bool.isRequired,
  gridOn: PropTypes.bool.isRequired,
  gridWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.number]),
  gridHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.number])
}

Oscar2.defaultProps = {
}

export default Oscar2
