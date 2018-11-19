import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'

import { getState, dispatch, subscribe } from '../../state'

import Loading from '../../components/Loading/Loading'
import Box from '../../components/Box/Box'
import Heading1 from '../../components/Heading1/Heading1'

import MainToolbarContainer from '../../component-instances/MainToolbarContainer'
import ResponsiveContainer from '../../component-instances/ResponsiveContainer'
import Game from '../../component-instances/Oscar/Game'

const StyledState = styled.div`
  padding-top: 1rem;
  padding-left: 1rem;
`

class StateProjectPlay extends PureComponent {
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

  render() {
    return (
      <Fragment>
        <MainToolbarContainer />
        <StyledState>
          {this.state.currentProject !== null &&
            <Fragment>
              <Game project={this.state.currentProject.project} resources={this.state.currentProject.resources} />
            </Fragment>
          }
        </StyledState>
      </Fragment>
    )
  }
}

export default StateProjectPlay
