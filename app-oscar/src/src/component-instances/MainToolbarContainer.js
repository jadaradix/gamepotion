import React, { Component } from 'react'
import { Redirect } from 'react-router'

import { getState, dispatch, subscribe } from '../state'

import MainToolbar from './MainToolbar'

class MainToolbarContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentProject: getState().currentProject,
      isAccountDropdownShowing: false,
      loggedOut: false
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
      }),
      subscribe('USER_LOG_OUT', () => {
        this.setState(
          {
            loggedOut: true
          },
          () => {
            // im so sorry
            this.setState({
              loggedOut: false
            })
          }
        )
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
    const updateIsAccountDropdownShowing = () => {
      this.setState({
        isAccountDropdownShowing: !this.state.isAccountDropdownShowing
      })
    }
    const setState = this.setState.bind(this)
    const actions = {
      'account'() {
        updateIsAccountDropdownShowing()
      },
      'log-out'() {
        dispatch({
          name: 'USER_LOG_OUT'
        })
      }
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
    if (this.state.loggedOut === true) {
      return <Redirect to='/auth' />
    }
    return (
      <MainToolbar currentProject={this.state.currentProject} onClick={this.handleOnClick} disabled={this.props.disabled} isAccountDropdownShowing={this.state.isAccountDropdownShowing} />
    )
  }
}

export default MainToolbarContainer
