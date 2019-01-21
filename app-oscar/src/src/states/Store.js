import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import { store } from '../inter-router'
import { getState, dispatch, subscribe } from '../state'
import getQueryParameter from '../getQueryParameter'

import Banner from '../components/Banner/Banner'
import Loading from '../components/Loading/Loading'
import MainToolbarContainer from '../component-instances/MainToolbarContainer'
import ResponsiveContainer from '../component-instances/ResponsiveContainer'
import CustomHelmet from '../component-instances/CustomHelmet'

const getCallback = () => {
  return getQueryParameter('callback') || 'none'
}

const CALLBACK_DELAY = 5000

const CALLBACKS = {
  'good': () => {
    return {
      initialState: {
        'callback': 'good'
      },
      laterState: {
        'callback': 'none'
      }
    }
  },
  'bad': () => {
    return {
      initialState: {
        'callback': 'bad'
      },
      laterState: {
        'callback': 'none'
      }
    }
  },
  'none': () => {
    return {
      initialState: {
        'callback': 'none'
      },
      laterState: undefined
    }
  }
}

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
    const callback = getCallback()
    const callbackResult = CALLBACKS[callback]()
    this.state = {
      user: getState().user,
      ...callbackResult.initialState
    }    
    this.callbackHandle = setTimeout(() => {
      callbackResult.laterState && this.setState(callbackResult.laterState)
    }, CALLBACK_DELAY)
  }

  componentDidMount () {
    if (this.state.user === null) {
      this.subscriptions = [
        subscribe('USER_GET', (state) => {
          this.setState({
            user: state.user
          })
        })
      ]
      dispatch({
        name: 'USER_GET',
      })
    } else {
      this.subscriptions = []
    }
  }

  componentWillUnmount () {
    this.subscriptions.forEach(s => s.unsubscribe())
    clearTimeout(this.callbackHandle)
  }

  render() {
    if (this.state.user === null) {
      return null
    }

    const url = `${this.props.match.params[0]}?accessToken=${this.state.user.accessToken}`

    return (
      <Fragment>
        <CustomHelmet
          title='Store'
        />
        <MainToolbarContainer />
        <ResponsiveContainer>
          <StyledState>
            {this.state.callback === 'good' && <Fragment>
              <Loading />
              <Banner flavour='good'>Thank you for your purchase! One moment...</Banner>
            </Fragment>}
            {this.state.callback === 'bad' && <Fragment>
              <Loading />
              <Banner flavour='bad'>Your purchase did not complete successfully. One moment...</Banner>
            </Fragment>}
            {this.state.callback === 'none' && <iframe title='Store' src={store(process.env.NODE_ENV, url)}>...</iframe>}
          </StyledState>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateStore
