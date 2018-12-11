import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'

import { getState, dispatch, subscribe } from '../../state'

import MainToolbarContainer from '../../component-instances/MainToolbarContainer'
import CustomHelmet from '../../component-instances/CustomHelmet'

import Oscar2 from '../../Oscar2'

const StyledState = styled.div`
  padding: 1rem;
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
              <CustomHelmet
                title={this.state.currentProject.project.name}
              />
              <div id='oscar2-container' />
              <Oscar2
                containerElementId='oscar2-container'
                project={this.state.currentProject.project}
                resources={this.state.currentProject.resources}
                spaceId={this.state.currentProject.project.startSpace}
                designMode={false}
                gridOn={false}
              />
            </Fragment>
          }
        </StyledState>
      </Fragment>
    )
  }
}

export default StateProjectPlay
