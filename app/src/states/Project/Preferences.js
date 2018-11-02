import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'

import { getState, dispatch, subscribe } from '../../state'

import Loading from '../../components/Loading/Loading'
import Box from '../../components/Box/Box'
import Heading1 from '../../components/Heading1/Heading1'

import MainToolbarContainer from '../../component-instances/MainToolbarContainer'
import ResponsiveContainer from '../../component-instances/ResponsiveContainer'

const StyledState = styled.div`
  .component--box {
    max-width: 640px;
    margin: 4rem auto 0 auto;
  }
`

class StateAuth extends PureComponent {
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
        <ResponsiveContainer>
          <StyledState>
            <Box>
              {this.state.currentProject === null && <Loading />}
              {this.state.currentProject !== null && <Fragment>
                <Heading1>{this.state.currentProject.project.name}</Heading1>
              </Fragment>}
            </Box>
          </StyledState>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateAuth
