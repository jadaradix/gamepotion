import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { getState, dispatch, subscribe } from '../../state'

import Box from '../../components/Box/Box'
import Loading from '../../components/Loading/Loading'

import MainToolbarContainer from '../../component-instances/MainToolbarContainer'
import ResourceList from '../../component-instances/ResourceList'
import Resource from '../../component-instances/Resource'

import BuyProModal from '../../modals/BuyPro'

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
      moduleIds: null,
      currentProject: null,
      resourceToLoadId: null,
      buyProModuleShowing: false,
      localSettings: getState().localSettings
    }
    this.hackUrlResourceId = 'load'
    this.onLoadResource = this.onLoadResource.bind(this)
    this.buyProModalOnGood = this.buyProModalOnGood.bind(this)
    this.buyProModalOnBad = this.buyProModalOnBad.bind(this)
  }

  componentDidMount() {
    this.subscriptions = [
      subscribe('USER_GET', (state) => {
        this.setState({
          moduleIds: state.user.modules.map(m => m.id)
        })
      }),
      subscribe('PROJECTS_START_LOAD', () => {
        dispatch({
          name: 'PROJECTS_LOAD',
          data: {
            id: this.props.match.params.id
          }
        })
      }),
      subscribe('PROJECTS_LOAD', (state) => {
        if (this.props.match.params.resourceId !== 'load') {
          return this.onLoadResource(this.props.match.params.resourceId)
        }
        if (this.props.match.params.resourceId === 'load' && state.currentProject.resources.length > 0) {
          return this.onLoadResource(state.currentProject.resources[0].id)
        }
      }),
      subscribe('PROJECTS_RESOURCES_LOAD', (state) => {
        this.setState({
          currentProject: state.currentProject
        })
      }),
      subscribe('PROJECTS_RESOURCES_CREATE', (state) => {
        this.hackSwitchUrl(state.currentProject.currentResource.id)
        this.setState({
          currentProject: state.currentProject
        })
      }),
      subscribe('BUY_MODULE', (state) => {
        const actions = {
          pro: () => {
            this.setState({
              buyProModuleShowing: true
            })
          }
        }
        typeof actions[state.moduleToBuy] === 'function' && actions[state.moduleToBuy]()
      }),
      subscribe('PROJECTS_RESOURCES_UPDATE', (state) => {
        this.setState({
          currentProject: state.currentProject
        })
      }),
      subscribe('PROJECTS_RESOURCES_DELETE', (state) => {
        state.currentProject.currentResource === null && this.hackSwitchUrl('load')
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
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.match.params.resourceId === 'load' && this.hackUrlResourceId !== 'load') {
      this.hackSwitchUrl(this.hackUrlResourceId)
      return false
    }
    console.error('[Project] [shouldComponentUpdate] returning true')
    return true
  }

  componentWillUnmount() {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  onAddResource(type) {
    dispatch({
      name: 'PROJECTS_RESOURCES_CREATE',
      data: {
        type
      }
    })
  }

  onLoadResource(id) {
    this.hackSwitchUrl(id)
    dispatch({
      name: 'PROJECTS_RESOURCES_LOAD',
      data: {
        id
      }
    })
  }

  hackSwitchUrl(resourceId) {
    this.hackUrlResourceId = resourceId
    this.props.history.replace(`/projects/${this.props.match.params.id}/resources/${resourceId}`)
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

  onUpdateResource(resource, data, forceWaitForResponse = false) {
    dispatch({
      name: 'PROJECTS_RESOURCES_UPDATE',
      data: {
        id: resource.id,
        forceWaitForResponse,
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
  }

  onUpdateLocalSetting(object) {
    // console.log('[state-Project] [onUpdateLocalSetting] object', object)
    dispatch({
      name: 'LOCAL_SETTINGS_UPDATE',
      data: {
        object
      }
    })
  }

  buyProModalOnGood() {
    this.setState({
      buyProModuleShowing: false
    })
  }

  buyProModalOnBad() {
    this.setState({
      buyProModuleShowing: false
    })
  }

  render() {
    console.error('[Project] [render]')
    // if (this.state.currentProject && this.state.currentProject.currentResource) {
    //   console.warn('[state-Project] [render] this.state.currentProject.currentResource', this.state.currentProject.currentResource)
    // }
    return (
      <Fragment>
        <MainToolbarContainer />
        <StyledState>
          {this.state.buyProModuleShowing &&
            <BuyProModal
              onGood={this.buyProModalOnGood}
              onBad={this.buyProModalOnBad}
            />
          }
          <aside>
            {this.state.currentProject === null &&
              <Loading />
            }
            {this.state.currentProject !== null &&
              <Box>
                <ResourceList
                  resources={this.state.currentProject.resources}
                  currentResource={this.state.currentProject.currentResource}
                  onAdd={this.onAddResource}
                  onLoad={this.onLoadResource}
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
                onUpdate={(data, forceWaitForResponse) => this.onUpdateResource(this.state.currentProject.currentResource, data, forceWaitForResponse)}
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
