import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { getState, dispatch, subscribe } from '../../state'

import Box from '../../components/Box/Box'
import Loading from '../../components/Loading/Loading'

import MainToolbarContainer from '../../component-instances/MainToolbarContainer'
import ResourceList from '../../component-instances/ResourceList'
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
        height: calc(100% - 2rem);
        overflow: scroll;
      }
    }
    > main {
      margin-left: calc(256px + 2rem);
      padding: 3rem 2rem 1rem 1rem;
    }
  }
`

class StateProjectProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moduleIds: [],
      currentProject: null,
      resourceToLoadId: null,
      localSettings: getState().localSettings
    }
  }

  doLoadResource(projectId, resourceId) {
    this.props.history.replace(`/projects/${projectId}/resources/${resourceId}`, {resourceId})
  }
  
  tryLoadResource(props) {
    const resourceId = props.match.params.resourceId
    if (typeof resourceId === 'string') {
      const foundResource = this.state.currentProject.resources.find(r => r.id === resourceId)
      if (foundResource !== undefined) {
        this.onLoadResource(foundResource)
      }
    }
  }

  componentDidMount() {
    this.subscriptions = [
      subscribe('USER_GET', (state) => {
        this.setState({
          moduleIds: state.user.modules.map(m => m.id)
        })
      }),
      subscribe('PROJECTS_LOAD', (state) => {
        this.setState({
          currentProject: state.currentProject
        })
        if (this.props.match.params.resourceId === undefined && state.currentProject.resources.length > 0) {
          return this.doLoadResource(state.currentProject.project.id, state.currentProject.resources[0].id)
        }
        this.tryLoadResource(this.props)
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
      }),
      subscribe('LOCAL_SETTINGS_UPDATE', (state) => {
        this.setState({
          localSettings: state.localSettings
        })
      })
    ]
    dispatch({
      name: 'USER_GET'
    })
    dispatch({
      name: 'PROJECTS_START_LOAD'
    })
    dispatch({
      name: 'PROJECTS_LOAD',
      data: {
        id: this.props.match.params.id
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    this.tryLoadResource(nextProps)
  }

  componentWillUnmount() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  // onAddResource(type) {
  //   dispatch({
  //     name: 'PROJECTS_RESOURCES_CREATE',
  //     data: {
  //       type
  //     }
  //   })
  // }

  onLoadResource(resource) {
    dispatch({
      name: 'PROJECTS_RESOURCES_LOAD',
      data: {
        id: resource.id
      }
    })
  }

  onRenameResource(resource) {
    const name = window.prompt(`What would you like to call ${resource.name}?`, resource.name)
    if (name === null || name.length === 0) {
      return
    }
    dispatch({
      name: 'PROJECTS_RESOURCES_UPDATE',
      data: {
        id: resource.id,
        name
      }
    })
  }

  onUpdateResource(resource, data) {
    dispatch({
      name: 'PROJECTS_RESOURCES_UPDATE',
      data: {
        id: resource.id,
        ...data
      }
    })
  }

  onDeleteResource(resource) {
    const confirmation = window.confirm(`Are you sure you want to delete ${resource.name}?`)
    if (confirmation === false) {
      return
    }
    dispatch({
      name: 'PROJECTS_RESOURCES_DELETE',
      data: {
        id: resource.id
      }
    })
    // why?
    // .catch(() => {})
  }

  onUpdateLocalSetting(name, value) {
    console.log('onUpdateLocalSetting!!!')
    dispatch({
      name: 'LOCAL_SETTINGS_UPDATE',
      data: {
        name,
        value
      }
    })
  }

  render() {
    // if (this.state.currentProject && this.state.currentProject.currentResource) {
    //   console.warn('[state-Project] this.state.currentProject.currentResource', this.state.currentProject.currentResource)
    // }
    return (
      <Fragment>
        <MainToolbarContainer />
        <StyledState>
          <aside>
            {this.state.currentProject === null &&
              <Loading />
            }
            {this.state.currentProject !== null &&
              <Box>
                <ResourceList
                  resources={this.state.currentProject.resources}
                  currentResource={this.state.currentProject.currentResource}
                  // onAdd={this.onAddResource}
                  onLoad={(r) => this.doLoadResource(this.state.currentProject.project.id, r.id)}
                  onRename={this.onRenameResource}
                  onDelete={this.onDeleteResource}
                />
              </Box>
            }
          </aside>
          <main>
            {this.state.currentProject !== null && this.state.currentProject.currentResource !== null &&
              <Resource
                moduleIds={this.state.moduleIds}
                project={this.state.currentProject.project}
                resources={this.state.currentProject.resources}
                resource={this.state.currentProject.currentResource}
                localSettings={this.state.localSettings}
                onUpdate={(data) => this.onUpdateResource(this.state.currentProject.currentResource, data)}
                onUpdateLocalSetting={this.onUpdateLocalSetting}
              />
            }
          </main>
        </StyledState>
      </Fragment>
    )
  }
}

export default withRouter(StateProjectProject)
