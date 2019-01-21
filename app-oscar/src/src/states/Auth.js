import React, { PureComponent, Fragment } from 'react'
import { Redirect } from 'react-router'
import styled from 'styled-components'

import { font, colours } from '../styleAbstractions'

import Box from '../components/Box/Box'
import Input from '../components/Input/Input'
import Button from '../react-components/Button/Button'
import Heading1 from '../components/Heading1/Heading1'

import MainToolbarContainer from '../component-instances/MainToolbarContainer'
import ResponsiveContainer from '../component-instances/ResponsiveContainer'

import { getState, dispatch } from '../state'
import { get } from '../localStorage'

const StyledState = styled.div`
  .component--box {
    max-width: 480px;
    margin: 4rem auto 0 auto;
  }
  .component--heading1 + * {
    margin-top: 1.5rem;
  }
  .component--button {
    display: inline-block;
  }
  .component--button + .component--button {
    margin-left: 0.5rem;
  }
  p {
    margin-top: 1rem;
    margin-bottom: 1rem;
    ${font}
    color: ${colours.fore};
  }
  p:last-of-type {
    margin-bottom: 1.5rem;
  }
`

const stages = new Map([

  ['email',
    {
      'init': (state) => {
        return {
          inProgress: false
        }
      },
      'render': (state, setStateCallback) => {
        const canGoNext = () => {
          const { inProgress } = state
          const isEmailValid = (state.userlandId.indexOf('@') > 0 && state.userlandId.length > state.userlandId.indexOf('@') + 1)
          return !inProgress && isEmailValid
        }
        const goNext = (e) => {
          e.preventDefault()
          setStateCallback({
            inProgress: true
          }, () => {
            dispatch({
              name: 'USER_LOG_IN',
              pleaseThrow: true,
              data: {
                userlandId: state.userlandId,
                password: 'dummy-password'
              }
            })
              .then(() => {
                // this only runs when skipPasswordCheck in api middleware is true
                // or if the user's password is genuinely 'dummy-password'
                return setStateCallback({
                  stage: 'log-in',
                  ...stages.get('log-in').init(state)
                })
              })
              .catch(error => {
                if (error.response === undefined) {
                  return setStateCallback({
                    inProgress: false
                  }) 
                }
                if (error.response.data.message === 'unknown e-mail address') {
                  return setStateCallback({
                    stage: 'create-decision',
                    ...stages.get('create-decision').init(state)
                  })
                }
                if (error.response.data.message === 'wrong password') {
                  return setStateCallback({
                    stage: 'log-in',
                    ...stages.get('log-in').init(state)
                  })
                }
              })
          })
        }
        const update = (prop, value) => {
          setStateCallback({
            [prop]: value
          })
        }
        return (
          <Fragment>
            <Heading1>Welcome to {process.env.REACT_APP_NAME}</Heading1>
            <p>
              Enter your e-mail to get started!
            </p>
            <form onSubmit={goNext}>
              <Input type='email' required autoFocus value={state.userlandId} onChange={(v) => update('userlandId', v)} />
              <Button disabled={!canGoNext()}>Next</Button>
            </form>
          </Fragment>
        )
      }
    }
  ],

  ['log-in',
    {
      'init': (state) => {
        return {
          inProgress: false
        }
      },
      'render': (state, setStateCallback) => {
        const canGoNext = () => {
          const { inProgress } = state
          const isPasswordValid = (state.password.length > 0)
          return !inProgress && isPasswordValid
        }
        const goNext = () => {
          setStateCallback({
            inProgress: true
          }, () => {
            dispatch({
              name: 'USER_LOG_IN',
              pleaseThrow: true,
              data: {
                userlandId: state.userlandId,
                password: state.password
              }
            })
              .then(() => {
                setStateCallback({
                  authenticated: true
                })
              })
              .catch(() => {
                setStateCallback({
                  inProgress: false
                })
              })
          })
        }
        const goPrevious = (e) => {
          return setStateCallback({
            stage: 'email',
            ...stages.get('email').init(state)
          })
        }
        const update = (prop, value) => {
          setStateCallback({
            [prop]: value
          })
        }
        return (
          <Fragment>
            <Heading1>Welcome back!</Heading1>
            <div>
              <Input type='password' label='Password' placeholder='' required autoFocus value={state.password} onChange={(v) => update('password', v)} onDone={goNext} />
              <Button onClick={goNext} disabled={!canGoNext()}>Log in</Button>
              <Button onClick={goPrevious} flavour='weak'>Go back</Button>
            </div>
          </Fragment>
        )
      }
    }
  ],

  ['create-decision',
    {
      'init': (state) => {
        return {
          inProgress: false
        }
      },
      'render': (state, setStateCallback) => {
        const canGoNext = () => {
          const { inProgress } = state
          return !inProgress
        }
        const goNext = () => {
          setStateCallback({
            inProgress: true
          }, () => {
            dispatch({
              name: 'USER_CREATE',
              pleaseThrow: true,
              data: {
                userlandId: state.userlandId,
                password: state.password
              }
            })
              .then(() => {
                setStateCallback({
                  authenticated: true
                })
              })
              .catch(() => {
                setStateCallback({
                  inProgress: false
                })
              })
          })
        }
        const goPrevious = () => {
          return setStateCallback({
            stage: 'email',
            ...stages.get('email').init(state)
          })
        }
        return (
          <Fragment>
            <Heading1>Hey there</Heading1>
            <div>
              <p>
                We couldn&rsquo;t find an account for <strong>{state.userlandId}</strong>.
              </p>
              <p>
                Would you like to create one?
              </p>
              <Button onClick={goNext} disabled={!canGoNext()}>Yes, create an account</Button>
              <Button onClick={goPrevious} flavour='weak'>No...</Button>
            </div>
          </Fragment>
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
      userlandId: getState().credentials.userlandId,
      password: getState().credentials.password,
      authenticated: false
    }
    this.state = {
      ...this.state,
      ...stages.get(this.state.stage).init(this.state)
    }
    // console.warn('[StateDashboard] [constructor] this.state', this.state)
  }

  render() {
    if (this.state.authenticated === true) {
      const to = get('log-in-redirect') || '/dashboard'
      return <Redirect to={to} />
    }
    return (
      <Fragment>
        <MainToolbarContainer disabled />
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
