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

import ChangePasswordModal from '../modals/ChangePassword'
import ChangeUserlandIdModal from '../modals/ChangeUserlandId'

const StyledState = styled.div`
  .component--box {
    max-width: 420px;
    margin: 4rem auto 0 auto;
  }
  .component--dropper, .component--input, .component--banner {
    margin-top: 1.5rem;
  }
  section + section {
    margin-top: 3rem;
  }
  section.account {
    .component--button {
      display: inline-block;
    }
    .component--button + .component--button {
      margin-left: 0.5rem;
    }
  }
`

class StateAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getState().user,
      showingChangePassword: false,
      newPassword: '',
      showingChangeUserlandId: false,
      newUserlandId: '',
      loggedOut: false
    }

    this.changeUserlandId = this.changeUserlandId.bind(this)
    this.onChangeUserlandId = this.onChangeUserlandId.bind(this)
    this.onCancelChangeUserlandId = this.onCancelChangeUserlandId.bind(this)

    this.changePassword = this.changePassword.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onCancelChangePassword = this.onCancelChangePassword.bind(this)
  }

  componentDidMount () {
    this.subscriptions = [
      subscribe('USER_GET', (state) => {
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
        name: 'USER_GET'
      })
    }
  }

  componentWillUnmount () {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  onUpdateProp(prop, value) {
    return dispatch({
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

  changeUserlandId() {
    this.setState({
      newUserlandId: this.state.user.userlandId,
      showingChangeUserlandId: true
    })
  }

  onChangeUserlandId() {
    this.onUpdateProp('userlandId', this.state.newUserlandId)
      .then(() => {
        this.setState({
          showingChangeUserlandId: false
        })
      })
  }

  onCancelChangeUserlandId() {
    this.setState({
      showingChangeUserlandId: false
    })
  }

  changePassword() {
    this.setState({
      newPassword: '',
      showingChangePassword: true
    })
  }

  onChangePassword() {
    this.onUpdateProp('password', this.state.newPassword)
      .then(() => {
        this.setState({
          newPassword: '',
          showingChangePassword: false
        })
      })
  }

  onCancelChangePassword() {
    this.setState({
      newPassword: '',
      showingChangePassword: false
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
        {this.state.showingChangeUserlandId &&
          <ChangeUserlandIdModal
            value={this.state.newUserlandId}
            onUpdate={(p, v) => this.setState({newUserlandId: v})}
            onGood={this.onChangeUserlandId}
            onBad={this.onCancelChangeUserlandId}
          />
        }
        {this.state.showingChangePassword &&
          <ChangePasswordModal
            value={this.state.newPassword}
            onUpdate={(p, v) => this.setState({newPassword: v})}
            onGood={this.onChangePassword}
            onBad={this.onCancelChangePassword}
          />
        }
        <MainToolbarContainer />
        <ResponsiveContainer>
          <StyledState>
            <Box>
              <section className='account'>
                <Heading1>Account</Heading1>
                <Input label='Name' value={this.state.user.name} onChange={(v) => this.onUpdateProp('name', v)} />
                {this.state.user.userlandId.indexOf('@') > 0 &&
                  <Fragment>
                    <Input label='E-mail' value={this.state.user.userlandId} disabled />
                    <Button onClick={this.changeUserlandId}>Change e-mail</Button>
                    <Button onClick={this.changePassword}>Change password</Button>
                  </Fragment>
                }
                <Button onClick={this.logOut} flavour='weak'>Log out</Button>
              </section>
            </Box>
          </StyledState>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateAccount
