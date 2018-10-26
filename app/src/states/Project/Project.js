import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import icons from '../../icons'
import { getState, dispatch, subscribe } from '../../state'

import List from '../../components/List/List'
import ListItem from '../../components/ListItem/ListItem'
import Box from '../../components/Box/Box'
import Loading from '../../components/Loading/Loading'

import MainToolbarContainer from '../../component-instances/MainToolbarContainer'
import ResourceList from '../../component-instances/ResourceList'
import ResponsiveContainer from '../../component-instances/ResponsiveContainer'
import Resource from '../../component-instances/Resource'

const StyledState = styled.div`
  > aside {
    padding: 1rem;
    // background-color: red;
  }
  > main {
    padding: 1rem;
    // background-color: blue;
  }
  @media screen and (min-width: 720px) {
    height: calc(100% - (3rem + 4px));
    > aside {
      float: left;
      width: 256px;
      height: calc(100% - 2rem);
      // background-color: red;
      > .component--box {
        height: calc(100% - 4rem);
        overflow: scroll;
      }
    }
    > main {
      margin-left: calc(256px + 2rem);
      padding: 3rem 1rem 1rem 1rem;
    }
  }
`

class StateProjectProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentProject: null
    }
    this.loadResource = this.loadResource.bind(this)
  }

  componentDidMount() {
    dispatch({
      name: 'PROJECTS_START_LOAD'
    })
    dispatch({
      name: 'PROJECTS_LOAD',
      data: {
        id: this.props.match.params.id
      }
    })
    this.subscriptions = [
      subscribe('PROJECTS_LOAD', (state) => {
        this.setState({
          currentProject: state.currentProject
        })
      }),
      subscribe('PROJECTS_RESOURCES_LOAD', (state) => {
        this.setState({
          currentProject: state.currentProject
        })
        // IF THIS WERE A PURE COMPONENT...
        // this is because PROJECTS_RESOURCES_LOAD updates a sub property
        // (currentResource) and this is a PureComponent which doesn't do
        // deep equality checks
        // this.forceUpdate()
      })
    ]
  }

  componentWillUnmount() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  loadResource(id) {
    return dispatch({
      name: 'PROJECTS_RESOURCES_LOAD',
      data: {
        id
      }
    })
  }

  render() {
    return (
      <Fragment>
        <MainToolbarContainer />
        <StyledState>
          <aside>
            {this.state.currentProject !== null &&
              <Box>
                <ResourceList loadResource={this.loadResource} resources={this.state.currentProject.resources} currentResource={this.state.currentProject.currentResource} />
              </Box>
            }
            {this.state.currentProject === null &&
              <Loading />
            }
          </aside>
          <main>
            {this.state.currentProject !== null && this.state.currentProject.currentResource &&
              <Resource resource={this.state.currentProject.currentResource} />
            }
          </main>
        </StyledState>
      </Fragment>
    )
  }
}

export default StateProjectProject
