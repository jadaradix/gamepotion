import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import { getState, dispatch, dispatchMany, subscribe } from '../state'
import icons from '../icons'

import Loading from '../components/Loading/Loading'
import Box from '../components/Box/Box'
import Heading1 from '../components/Heading1/Heading1'
import Heading2 from '../components/Heading2/Heading2'
import Input from '../components/Input/Input'
import List from '../components/List/List'
import ListItem from '../components/ListItem/ListItem'

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
  .component--heading2 + .component--list {
    margin-top: 1rem;
  }
`

class StateTeam extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getState().user,
      team: getState().team
    }
  }

  componentDidMount () {
    this.subscriptions = [
      subscribe('USER_GET', (state) => {
        this.setState({
          user: state.user,
          team: state.team
        })
      }),
      subscribe('TEAM_USERS_GET', (state) => {
        this.setState({
          teamUsers: state.teamUsers
        })
      }),
      subscribe('TEAM_UPDATE', (state) => {
        this.setState({
          team: state.team
        })
      })
    ]
    dispatchMany([
      {
        name: 'USER_GET'
      },
      {
        name: 'TEAM_USERS_GET'
      }
    ])
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
    if (this.state.team === null || !Array.isArray(this.state.teamUsers)) {
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
          title='My team'
        />
        <MainToolbarContainer />
        <ResponsiveContainer>
          <StyledState>
            <Box>
              <section>
                <Heading1>My team</Heading1>
                <Input label='Name' value={this.state.team.name} onChange={(v) => this.onUpdateProp('name', v)} />
              </section>
              <section>
                <Heading2>Members</Heading2>
                <List>
                  {this.state.teamUsers.map(tu => {
                    const isYou = tu.id === this.state.user.id
                    const tags = (tu.isTeamAdmin ?
                      [
                        {
                          name: 'Team admin',
                          colour: '#a537fd'
                        }
                      ]
                      :
                      []
                    )
                    return (
                      <ListItem id={tu.id} key={tu.id} icon={icons.generic.teamMember} tags={tags}>{tu.name}{isYou ? ' (you)' : ''}</ListItem>
                    )
                  })}
                </List>
              </section>
            </Box>
          </StyledState>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateTeam
