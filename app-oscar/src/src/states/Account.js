import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import styled from 'styled-components'

import { getState, dispatch, subscribe } from '../state'
import { font } from '../styleAbstractions'

import Loading from '../components/Loading/Loading'
import Button from '../components/Button/Button'
import Box from '../components/Box/Box'
import Heading1 from '../components/Heading1/Heading1'
import Input from '../components/Input/Input'

import MainToolbarContainer from '../component-instances/MainToolbarContainer'
import ResponsiveContainer from '../component-instances/ResponsiveContainer'
import CustomHelmet from '../component-instances/CustomHelmet'
import ChangePasswordModal from '../modals/ChangePassword'

// import Heading2 from '../components/Heading2/Heading2'
// const SUBSCRIPTIONS = [
//   {
//     id: 'free',
//     name: 'Free'
//   },
//   {
//     id: 'pro',
//     name: 'Pro'
//   },
//   {
//     id: 'boss',
//     name: 'Boss'
//   }
// ]
/*
const currentSubscriptionId = this.state.user.getSubscription().id
const currentSubscriptionWhen = new Date(this.state.user.getSubscription().when * 1000).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
<section className='subscriptions'>
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
*/

const StyledState = styled.div`
  .component--box {
    max-width: 360px;
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
  // section.subscriptions {
  //   .component--heading1 + .subscription {
  //     margin-top: 1.5rem;
  //   }
  //   .subscription {
  //     padding: 1rem;
  //     border-radius: 4px;
  //     border: 2px solid transparent;
  //     box-shadow: 0 4px 20px rgb(212, 212, 212);
  //     .component--heading2 + .component--button {
  //       margin-top: 1rem;
  //     }
  //     .component--heading2 + p {
  //       margin-top: 0.5rem;
  //     }
  //     p {
  //       ${font}
  //       font-size: 80%;
  //       color: #6c7a89;
  //     }
  //     &.current {
  //       border-color: #dadfe1;
  //     }
  //     &:not(:last-child) {
  //       margin-bottom: 1rem;
  //     }
  //   }
  // }
`

class StateAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getState().user,
      showingChangePassword: false,
      newPassword: '',
      loggedOut: false
    }
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
        {this.state.showingChangePassword && (
          <ChangePasswordModal
            password={this.state.newPassword}
            onUpdate={(p, v) => this.setState({newPassword: v})}
            onGood={this.onChangePassword}
            onBad={this.onCancelChangePassword}
          />
        )
        }
        <MainToolbarContainer />
        <ResponsiveContainer>
          <StyledState>
            <Box>
              <section className='account'>
                <Heading1>Account</Heading1>
                <Input label='Name' value={this.state.user.name} onChange={(v) => this.onUpdateProp('name', v)} />
                <Button onClick={this.changePassword}>Change password</Button>
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
