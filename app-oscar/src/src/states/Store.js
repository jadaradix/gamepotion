import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import { store } from '../inter-router'
import { getState, dispatch, subscribe } from '../state'

import MainToolbarContainer from '../component-instances/MainToolbarContainer'
import ResponsiveContainer from '../component-instances/ResponsiveContainer'
import CustomHelmet from '../component-instances/CustomHelmet'

const StyledState = styled.div`
  iframe {
    width: 100%;
    height: 640px;
    border: 0;
  }
`

class StateStore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getState().user
    }
  }

  componentDidMount () {
    this.subscriptions = [
      subscribe('USER_GET', (state) => {
        this.setState({
          user: state.user
        })
      })
    ]
    if (this.state.user === null) {
      dispatch({
        name: 'USER_GET',
      })
    }
  }

  componentWillUnmount () {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  render() {
    if (this.state.user === null) {
      return null
    }
    return (
      <Fragment>
        <CustomHelmet
          title='Store'
        />
        <MainToolbarContainer />
        <ResponsiveContainer>
          <StyledState>
            <iframe title='Store' src={store(process.env.NODE_ENV, this.props.match.params[0], this.state.user.accessToken)}>...</iframe>
          </StyledState>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateStore
