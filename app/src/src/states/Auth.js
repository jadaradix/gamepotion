import React, { PureComponent, Fragment } from 'react'
import { Redirect } from 'react-router'
import styled from 'styled-components'
import { get, set } from '../localStorage'

import Box from '../components/Box/Box'
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

const stages = new Map([
  ['email',
    {
      'init': (state) => {
        return {
          autofocusEmail: (state.email.length > 0)
        }
      },
      'render': (state, setStateCallback) => {
        const canGoNext = () => {
          const isEmailValid = (state.email.indexOf('@') > 0 && state.email.length > state.email.indexOf('@') + 1)
          const isPasswordValid = (state.password.length > 0)
          return (isEmailValid && isPasswordValid)
        }

        const goNext = (e) => {
          e.preventDefault()
          dispatch({
            name: 'USER_LOG_IN',
            data: {
              email: state.email,
              password: state.password
            }
          })
        }

        const update = (prop, value) => {
          setStateCallback({
            [prop]: value
          })
        }

        return (
          <form onSubmit={goNext}>
            <Input label='E-mail' placeholder='james@gamemaker.club' required autoFocus={state.autofocusEmail} value={state.email} onChange={(v) => update('email', v)} />
            <Input label='Password' placeholder='' type='password' required autoFocus={state.autofocusPassword} value={state.password} onChange={(v) => update('password', v)} />
            <Button disabled={!canGoNext()}>Next</Button>
          </form>
        )
      }
    }
  ]
])

class StateDashboard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      stage: 'email',
      email: get('credentials-email'),
      password: '',
      authenticated: false
    }
    this.state = {
      ...this.state,
      ...stages.get(this.state.stage).init(this.state)
    }
  }

  componentDidMount () {
    this.subscriptions = [
      subscribe('USER_LOG_IN', (state) => {
        const authenticated = (state.user !== null)
        this.setState({
          authenticated
        })
      })
    ]
  }

  componentWillUnmount () {
    this.subscriptions.forEach(s => s.unsubscribe())
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
              {stages.get(this.state.stage).render(
                this.state,
                this.setState.bind(this)
              )}
            </Box>
          </StyledState>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateDashboard
