import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import { getState, dispatch, subscribe } from '../state'

import Loading from '../components/Loading/Loading'
import Box from '../components/Box/Box'
import Heading1 from '../components/Heading1/Heading1'
import Input from '../components/Input/Input'
import Button from '../components/Button/Button'

import MainToolbarContainer from '../component-instances/MainToolbarContainer'
import ResponsiveContainer from '../component-instances/ResponsiveContainer'
import CustomHelmet from '../component-instances/CustomHelmet'

const StyledState = styled.div`
  .component--box {
    max-width: 420px;
    margin: 4rem auto 0 auto;
  }
  section + section {
    margin-top: 3rem;
  }
  section.team {
  }
`

class StateTeam extends Component {
  constructor(props) {
    super(props)
    this.state = {
      team: getState().team
    }
  }

  componentDidMount () {
    this.subscriptions = [
      subscribe('USER_GET', (state) => {
        this.setState({
          team: state.team
        })
      }),
      subscribe('TEAM_UPDATE', (state) => {
        this.setState({
          team: state.team
        })
      })
    ]
    if (this.state.team === null) {
      dispatch({
        name: 'USER_GET'
      })
    }
  }

  componentWillUnmount () {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  onUpdateProp(prop, value) {
    dispatch({
      name: 'TEAM_UPDATE',
      data: {
        [prop]: value
      }
    })
  }

  render() {
    if (this.state.team === null) {
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
          title='Team'
        />
        <MainToolbarContainer />
        <ResponsiveContainer>
          <StyledState>
            <Box>
              <section className='team'>
                <Heading1>Team</Heading1>
                <Input label='Name' value={this.state.team.name} onChange={(v) => this.onUpdateProp('name', v)} />
              </section>
            </Box>
          </StyledState>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateTeam
