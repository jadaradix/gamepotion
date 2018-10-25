import React, { Component } from 'react'

import { getState, subscribe } from '../state'

import MainToolbar from './MainToolbar'

class MainToolbarContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentProject: getState().currentProject
    }
    this.handleOnClick = this.handleOnClick.bind(this)
    this.runProject = this.runProject.bind(this)
    this.shareProject = this.shareProject.bind(this)
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
      })
    ]
  }

  componentWillUnmount () {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  handleOnClick (action) {
    console.warn('[MainToolbarContainer] [handleOnClick] action', action)
    const actions = {
      'project-run': () => {
        this.runProject()
      },
      'project-share': () => {
        this.shareProject()
      },
      'add-resource-image': () => {
        this.addResource('image')
      },
      'add-resource-sound': () => {
        this.addResource('sound')
      },
      'add-resource-atom': () => {
        this.addResource('atom')
      },
      'add-resource-space': () => {
        this.addResource('space')
      }
    }
    const foundAction = actions[action]
    if (typeof foundAction === 'function') {
      actions[action]()
    }
  }

  runProject() {
    console.warn('[MainToolbarContainer] [runProject]')
  }

  shareProject() {
    console.warn('[MainToolbarContainer] [shareProject]')
  }

  addResource(type) {
    console.warn('[MainToolbarContainer] [addResource] type', type)
  }

  render() {
    return (
      <MainToolbar currentProject={this.state.currentProject} onClick={this.handleOnClick} />
    )
  }
}

export default MainToolbarContainer
