import React, { Component } from 'react'

import { getState, dispatch, subscribe } from '../state'

import MainToolbar from './MainToolbar'

class MainToolbarContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentProject: getState().currentProject
    }
    this.handleOnClick = this.handleOnClick.bind(this)
    this.addResource = this.addResource.bind(this)
  }

  componentDidMount () {
    this.subscriptions = [
      subscribe('PROJECTS_UPDATE', (state) => {
        this.setState({
          currentProject: state.currentProject
        })
      }),
      subscribe('PROJECTS_START_LOAD', (state) => {
        this.setState({
          currentProject: state.currentProject
        })
      }),
      subscribe('PROJECTS_LOAD', (state) => {
        this.setState({
          currentProject: state.currentProject
        })
      }),
      subscribe('PROJECTS_DELETE', (state) => {
        this.setState({
          currentProject: state.currentProject
        })
      })
    ]
  }

  componentWillUnmount () {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  handleOnClick (action) {
    console.warn('[MainToolbarContainer] [handleOnClick] action', action)
    if (action.startsWith('add-resource-')) {
      const resourceType = action.substring('add-resource-'.length)
      return this.addResource(resourceType)
    }
    const actions = {
    }
    const foundAction = actions[action]
    if (typeof foundAction === 'function') {
      actions[action]()
    }
  }

  addResource(type) {
    dispatch({
      name: 'PROJECTS_RESOURCES_CREATE',
      data: {
        type
      }
    })
  }

  render() {
    return (
      <MainToolbar currentProject={this.state.currentProject} onClick={this.handleOnClick} disabled={this.props.disabled} />
    )
  }
}

export default MainToolbarContainer
