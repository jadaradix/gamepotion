import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import styled from 'styled-components'
import classNames from 'classnames'

import { getState, dispatch, subscribe } from '../state'
import { font, colours } from '../styleAbstractions'

import Loading from '../components/Loading/Loading'
import Button from '../components/Button/Button'
import Box from '../components/Box/Box'
import Heading1 from '../components/Heading1/Heading1'
import Heading2 from '../components/Heading2/Heading2'
import Input from '../components/Input/Input'

import MainToolbarContainer from '../component-instances/MainToolbarContainer'
import ResponsiveContainer from '../component-instances/ResponsiveContainer'
import CustomHelmet from '../component-instances/CustomHelmet'

const SUBSCRIPTIONS = [
  {
    id: 'free',
    name: 'Free'
  },
  {
    id: 'pro',
    name: 'Pro'
  },
  {
    id: 'boss',
    name: 'Boss'
  }
]

const StyledState = styled.div`
  .component--box {
    max-width: 360px;
    margin: 4rem auto 0 auto;
  }
  .component--dropper, .component--input, .component--banner {
    margin-top: 1.5rem;
  }
  .component--heading1 + .subscription {
    margin-top: 1.5rem;
  }
  section + section {
    margin-top: 2rem;
  }
  .subscription {
    padding: 1rem;
    border-radius: 4px;
    border: 2px solid transparent;
    box-shadow: 0 4px 20px rgb(212, 212, 212);
    .component--heading2 + .component--button {
      margin-top: 1rem;
    }
    .component--heading2 + p {
      margin-top: 0.5rem;
    }
    p {
      ${font}
      font-size: 80%;
      color: #6c7a89;
    }
    &.current {
      border-color: #dadfe1;
    }
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
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

    const currentSubscriptionId = this.state.user.getSubscription().id
    const currentSubscriptionWhen = new Date(this.state.user.getSubscription().when * 1000).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})

    return (
      <Fragment>
        <CustomHelmet
          title='Account'
        />
        <MainToolbarContainer />
        <ResponsiveContainer>
          <StyledState>
            <Box>
              <section>
                <Heading1>Account</Heading1>
                <Input label='Name' value={this.state.user.name} onChange={(v) => this.onUpdateProp('name', v)} />
                <Button onClick={this.logOut}>Log out</Button>
              </section>
              <section>
                <Heading1>Subscription</Heading1>
                {SUBSCRIPTIONS.map(s => {
                  const current = (currentSubscriptionId === s.id)
                  return (
                    <div key={s.id} className={classNames('subscription', {current})}>
                      <Heading2>{s.name}</Heading2>
                      {current && <p>Since {currentSubscriptionWhen}</p>}
                      {current && currentSubscriptionId !== 'free' && <Button disabled>Unsubscribe</Button>}
                      {!current && <Button disabled>Subscribe</Button>}
                    </div>
                  )
                })}
              </section>
            </Box>
          </StyledState>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateAccount
