import React, { PureComponent, Fragment } from 'react'
import { Redirect } from 'react-router'
import styled from 'styled-components'
import icons from '../icons'
import { get, set } from '../localStorage'

import Box from '../components/Box/Box'
import Heading1 from '../components/Heading1/Heading1'
import Input from '../components/Input/Input'
import Button from '../components/Button/Button'

import MainToolbarContainer from '../component-instances/MainToolbarContainer'
import ResponsiveContainer from '../component-instances/ResponsiveContainer'

import { dispatch, subscribe } from '../state'

const StyledState = styled.div`
  .component--box {
    max-width: 480px;
    margin: 4rem auto 0 auto;
  }
  .component--heading1 + form {
    margin-top: 1.5rem;
  }
`

class StateDashboard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      email: get('credentials-email'),
      password: '',
      authenticated: false
    }
    if (this.state.email.length > 0) {
      this.autofocusEmail = false
      this.autofocusPassword = true
    } else {
      this.autofocusEmail = true
      this.autofocusPassword = false
    }
    this.update = this.update.bind(this)
    this.submit = this.submit.bind(this)
    this.canSubmit = this.canSubmit.bind(this)
  }

  componentDidMount () {
    this.subscriptions = [
      subscribe('USER_LOG_IN', (state) => {
        const authenticated = (state.user !== null)
        // if (authenticated === false) {
        //   notify.bad('That didn&rsquo;t work. Please try again.')
        // }
        this.setState({
          authenticated
        })
      })
    ]
  }

  componentWillUnmount () {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  update(prop, value) {
    this.setState({
      [prop]: value
    })
  }

  submit (e) {
    e.preventDefault()
    dispatch({
      name: 'USER_LOG_IN',
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
  }

  canSubmit () {
    const isEmailValid = (this.state.email.indexOf('@') > 0 && this.state.email.length > this.state.email.indexOf('@') + 1)
    const isPasswordValid = (this.state.password.length > 0)
    return (isEmailValid && isPasswordValid)
  }

  render() {
    if (this.state.authenticated === true) {
      const hash = get('log-in-redirect-hash')
      if (hash === null) {
        return <Redirect to={'/dashboard'} />
      } else {
        set('log-in-redirect-hash', null)
        return <Redirect to={hash} />
      }
    }
    return (
      <Fragment>
        <MainToolbarContainer />
        <ResponsiveContainer>
          <StyledState>
            <Box>
              <form onSubmit={this.submit}>
                <Input label='E-mail' placeholder='james@gamemaker.club' required autoFocus={this.autofocusEmail} value={this.state.email} onChange={(v) => this.update('email', v)} />
                <Input label='Password' placeholder='' type='password' required autoFocus={this.autofocusPassword} value={this.state.password} onChange={(v) => this.update('password', v)} />
                <Button disabled={!this.canSubmit()} hint='Log In'>Log In</Button>
              </form>
            </Box>
          </StyledState>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateDashboard
