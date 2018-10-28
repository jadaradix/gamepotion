import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import icons from '../../icons'
import { getState, dispatch, subscribe } from '../../state'
import notify from '../../notify'

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
  > aside {
    > .component--box {
      padding: 1rem;
    }
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
      currentProject: null,
      errored: false
    }
    this.onLoad = this.onLoad.bind(this)
    this.onDelete = this.onDelete.bind(this)
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
        if (state.currentProject === null) {
          notify.bad('This project couldn&rsquo;t be loaded.')
          this.setState({
            currentProject: null,
            errored: true
          })
          return
        }
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
      }),
      subscribe('PROJECTS_RESOURCES_CREATE', (state) => {
        this.setState({
          currentProject: state.currentProject
        })
      }),
      subscribe('PROJECTS_RESOURCES_UPDATE', (state) => {
        this.setState({
          currentProject: state.currentProject
        })
      }),
      subscribe('PROJECTS_RESOURCES_DELETE', (state) => {
        this.setState({
          currentProject: state.currentProject
        })
      })
    ]
  }

  componentWillUnmount() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  onLoad(resource) {
    return dispatch({
      name: 'PROJECTS_RESOURCES_LOAD',
      data: {
        id: resource.id
      }
    })
  }

  onRename(resource) {
    const name = window.prompt(`What would you like to call ${resource.name}?`, resource.name)
    if (name === undefined) {
      return
    }
    return dispatch({
      name: 'PROJECTS_RESOURCES_UPDATE',
      data: {
        id: resource.id,
        name
      }
    })
  }

  onUpdate(resource, data) {
    return dispatch({
      name: 'PROJECTS_RESOURCES_UPDATE',
      data: {
        id: resource.id,
        ...data
      }
    })
  }

  onDelete(resource) {
    const confirmation = window.confirm(`Are you sure you want to delete ${resource.name}?`)
    if (confirmation === false) {
      return
    }
    return dispatch({
      name: 'PROJECTS_RESOURCES_DELETE',
      data: {
        id: resource.id
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
                <ResourceList onLoad={this.onLoad} onRename={this.onRename} onDelete={this.onDelete} resources={this.state.currentProject.resources} currentResource={this.state.currentProject.currentResource} />
              </Box>
            }
            {this.state.currentProject === null && this.state.errored === false &&
              <Loading />
            }
          </aside>
          <main>
            {this.state.currentProject !== null && this.state.currentProject.currentResource &&
              <Resource resource={this.state.currentProject.currentResource} onUpdate={(data) => this.onUpdate(this.state.currentProject.currentResource, data)} onDelete={() => this.onDelete(this.state.currentProject.currentResource)} />
            }
          </main>
        </StyledState>
      </Fragment>
    )
  }
}

export default StateProjectProject
