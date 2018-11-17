import React, { PureComponent, Fragment } from 'react'
import { Redirect } from 'react-router'
import styled from 'styled-components'
import { get, set } from '../localStorage'

import { font, colours } from '../styleAbstractions'

import Box from '../components/Box/Box'
import Input from '../components/Input/Input'
import Button from '../components/Button/Button'
import Heading1 from '../components/Heading1/Heading1'

import MainToolbarContainer from '../component-instances/MainToolbarContainer'
import ResponsiveContainer from '../component-instances/ResponsiveContainer'

import { dispatch } from '../state'

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
`

const stages = new Map([

  ['email',
    {
      'init': (state) => {
        return {
          autoFocus: true // (state.email.length > 0)
        }
      },
      'render': (state, setStateCallback) => {
        const canGoNext = () => {
          const isEmailValid = (state.email.indexOf('@') > 0 && state.email.length > state.email.indexOf('@') + 1)
          return isEmailValid
        }
        const goNext = (e) => {
          e.preventDefault()
          dispatch({
            name: 'USER_LOG_IN',
            data: {
              email: state.email,
              password: 'dummy-password'
            }
          })
            .catch(error => {
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
        }
        const update = (prop, value) => {
          setStateCallback({
            [prop]: value
          })
        }
        return (
          <Fragment>
            <form onSubmit={goNext}>
              <Input type='email' label='E-mail' placeholder='james@gamemaker.club' required autoFocus={state.autoFocus} value={state.email} onChange={(v) => update('email', v)} />
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
          autoFocus: true // (state.password.length > 0)
        }
      },
      'render': (state, setStateCallback) => {
        const canGoNext = () => {
          const isPasswordValid = (state.password.length > 0)
          return isPasswordValid
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
            .then(() => {
              setStateCallback({
                authenticated: true
              })
            })
        }
        const goPrevious = (e) => {
          e.preventDefault()
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
              <Input type='password' label='Password' placeholder='' required autoFocus={state.autoFocus} value={state.password} onChange={(v) => update('password', v)} />
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
        return {}
      },
      'render': (state, setStateCallback) => {
        const goNext = (e) => {
          e.preventDefault()
          console.warn('create account here!')
          dispatch({
            name: 'USER_CREATE',
            data: {
              email: state.email,
              password: state.password
            }
          })
            .then(() => {
              setStateCallback({
                authenticated: true
              })
            })
        }
        const goPrevious = (e) => {
          e.preventDefault()
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
                We couldn&rsquo;t find an account for <strong>{state.email}</strong>.
              </p>
              <p>
                Would you like to create one?
              </p>
              <Button onClick={goNext}>Yes, create an account</Button>
              <Button onClick={goPrevious} flavour='weak'>No</Button>
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
      email: get('credentials-email'),
      password: '',
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
