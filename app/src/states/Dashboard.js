import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'
import icons from '../icons'

import Button from '../components/Button/Button'
import Heading1 from '../components/Heading1/Heading1'
import List from '../components/List/List'
import ListItem from '../components/ListItem/ListItem'
import Loading from '../components/Loading/Loading'
import Box from '../components/Box/Box'

import MainToolbar from '../component-instances/MainToolbar'
import ResponsiveContainer from '../component-instances/ResponsiveContainer'

import dispatch from '../state'

const StyledState = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  @media (min-width: 720px) {
    grid-template-columns: 2fr 2fr;
    grid-gap: 2rem;
  }
`

class StateDashboard extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      projects: null,
      currentProject: null
    }
    const d = {
      name: 'PROJECTS_GET'
    }
    dispatch(d)
      .then(state => {
        this.setState({
          projects: state.projects,
          currentProject: state.currentProject
        })
      })
    this.actOnProject = this.actOnProject.bind(this)
  }

  loadProject (id) {
    console.warn('[state-Dashboard] [loadProject]', id)
    const d = {
      name: 'PROJECTS_LOAD',
      data: {
        id
      }
    }
    dispatch(d)
      .then(state => {
        this.setState({
          currentProject: state.currentProject
        })
      })
  }

  actOnProject(id, action) {
    const actions = {
      'rename': () => {
        console.warn('[state-Dashboard] [actOnProject] rename')
      },
      'delete': () => {
        console.warn('[state-Dashboard] [actOnProject] delete')
        const d = {
          name: 'PROJECTS_DELETE',
          data: {
            id
          }
        }
        dispatch(d)
          .then(state => {
            console.warn('new state', state)
            this.setState({
              projects: state.projects,
              currentProject: state.currentProject
            })
          })
      }
    }
    const foundAction = actions[action]
    if (typeof foundAction === 'function') {
      actions[action]()
    }
  }

  // actions={[(() => (p !== this.state.currentProject ? 'load' : 'dummy'))(), 'rename', 'delete']}
  render() {
    return (
      <Fragment>
        <MainToolbar />
        <ResponsiveContainer>
          <StyledState>
            <Box>
              <Heading1>Projects</Heading1>
              {this.state.projects === null ? 
                <Loading />
                :
                <Fragment>
                  <List>
                    {this.state.projects.map(p => (
                      <ListItem
                        selected={p === this.state.currentProject}
                        key={p.id}
                        id={p.id}
                        icon={icons.generic.project.project}
                        actions={['rename', 'delete']}
                        onChoose={(id) => this.loadProject(id)}
                        onAction={this.actOnProject}
                      >
                        {p.name}
                      </ListItem>
                    ))}
                  </List>
                  <Button hint='Create project' route='/project/new'>Create project</Button>
                </Fragment>
              }
            </Box>
            <Box>
              <Heading1>News</Heading1>
            </Box>
          </StyledState>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateDashboard
