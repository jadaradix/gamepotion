import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import { getState, dispatch, subscribe } from '../../state'

import Loading from '../../components/Loading/Loading'
import Box from '../../components/Box/Box'
import Heading1 from '../../components/Heading1/Heading1'
import Input from '../../components/Input/Input'
import Banner from '../../components/Banner/Banner'
import Dropper from '../../components/Dropper/Dropper'

import MainToolbarContainer from '../../component-instances/MainToolbarContainer'
import ResponsiveContainer from '../../component-instances/ResponsiveContainer'
import CustomHelmet from '../../component-instances/CustomHelmet'

const StyledState = styled.div`
  .component--box {
    max-width: 360px;
    margin: 4rem auto 0 auto;
  }
  .component--dropper, .component--input, .component--banner {
    margin-top: 1.5rem;
  }
`

class StateProjectPreferences extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentProject: getState().currentProject
    }
  }

  componentDidMount () {
    this.subscriptions = [
      subscribe('PROJECTS_LOAD', (state) => {
        this.setState({
          currentProject: state.currentProject
        })
      }),
      subscribe('PROJECTS_UPDATE', (state) => {
        this.setState({
          currentProject: state.currentProject
        })
      }),
      subscribe('PROJECTS_RESOURCES_CREATE', (state) => {
        this.setState({
          currentProject: state.currentProject
        })
      })
    ]
    if (this.state.currentProject === null) {
      dispatch({
        name: 'PROJECTS_LOAD',
        data: {
          id: this.props.match.params.id
        }
      })
    }
  }

  componentWillUnmount () {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  onUpdateProp(prop, value) {
    dispatch({
      name: 'PROJECTS_UPDATE',
      data: {
        id: this.props.match.params.id,
        [prop]: value
      }
    })
  }

  render() {
    if (this.state.currentProject === null) {
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

    const spaceResources = this.state.currentProject.resources
      .filter(r => r.type === 'space')
      .map(r => {
        return {
          id: r.id,
          name: r.name
        }
      })

    return (
      <Fragment>
        <CustomHelmet
          title='Game settings'
        />
        <MainToolbarContainer />
        <ResponsiveContainer>
          <StyledState>
            <Box>
              <Fragment>
                <Heading1>Game settings</Heading1>
                <Input label='Name' value={this.state.currentProject.project.name} onChange={(v) => this.onUpdateProp('name', v)} />
                {spaceResources.length === 0 &&
                  <Banner>Your game has no Spaces. You can&rsquo;t play it until you add a Space.</Banner>
                }
                {spaceResources.length > 0 &&
                  <Dropper label='Start Space' options={spaceResources} onChoose={(v) => this.onUpdateProp('startSpace', v)} value={this.state.currentProject.project.startSpace} />
                }
              </Fragment>
            </Box>
          </StyledState>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateProjectPreferences
