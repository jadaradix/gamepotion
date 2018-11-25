import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import styled from 'styled-components'

import { getState, dispatch, subscribe } from '../state'

import Loading from '../components/Loading/Loading'
import Button from '../components/Button/Button'
import Box from '../components/Box/Box'
import Heading1 from '../components/Heading1/Heading1'
import Input from '../components/Input/Input'

import MainToolbarContainer from '../component-instances/MainToolbarContainer'
import ResponsiveContainer from '../component-instances/ResponsiveContainer'
import CustomHelmet from '../component-instances/CustomHelmet'

const StyledState = styled.div`
  .component--box {
    max-width: 360px;
    margin: 4rem auto 0 auto;
  }
  .component--dropper, .component--input, .component--banner {
    margin-top: 1.5rem;
  }
`

class StateAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getState().user,
      loggedOut: false
    }
  }

  componentDidMount () {
    this.subscriptions = [
      subscribe('USER_LOG_IN', (state) => {
        this.setState({
          user: state.user
        })
      }),
      subscribe('USER_UPDATE', (state) => {
        this.setState({
          user: state.user
        })
      }),
      subscribe('USER_LOG_OUT', () => {
        this.setState({
          loggedOut: true
        })
      })
    ]
    if (this.state.user === null) {
      dispatch({
        name: 'USER_LOG_IN',
        data: {
          userlandId: getState().credentials.userlandId,
          password: getState().credentials.password
        }
      })
    }
  }

  componentWillUnmount () {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  onUpdateProp(prop, value) {
    dispatch({
      name: 'USER_UPDATE',
      data: {
        id: this.props.match.params.id,
        [prop]: value
      }
    })
  }

  logOut() {
    dispatch({
      name: 'USER_LOG_OUT'
    })
  }


  render() {
    if (this.state.loggedOut === true) {
      return <Redirect to='/auth' />
    }

    if (this.state.user === null) {
      return (
        <Fragment>
          <MainToolbarContainer />
          <ResponsiveContainer>
            <StyledState>
              <Box>
                <Loading />
              </Box>
            </StyledState>
          </ResponsiveContainer>
        </Fragment>
      )
    }

    return (
      <Fragment>
        <CustomHelmet
          title='Account'
        />
        <MainToolbarContainer />
        <ResponsiveContainer>
          <StyledState>
            <Box>
              <Fragment>
                <Heading1>Account</Heading1>
                <Input label='Name' value={this.state.user.name} onChange={(v) => this.onUpdateProp('name', v)} />
                <Button onClick={this.logOut}>Log out</Button>
              </Fragment>
            </Box>
          </StyledState>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateAccount
