import React, { PureComponent, Fragment } from 'react'
import { Redirect } from 'react-router'
import styled from 'styled-components'
import icons from '../icons'

import Button from '../components/Button/Button'
import Heading1 from '../components/Heading1/Heading1'
import List from '../components/List/List'
import ListItem from '../components/ListItem/ListItem'
import Loading from '../components/Loading/Loading'
import Box from '../components/Box/Box'

import MainToolbarContainer from '../component-instances/MainToolbarContainer'
import ResponsiveContainer from '../component-instances/ResponsiveContainer'

import { dispatch, subscribe } from '../state'

const StyledState = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  @media screen and (min-width: 720px) {
    grid-template-columns: 2fr 2fr;
    grid-gap: 2rem;
  }
`

class StateDashboard extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      projects: null,
      currentProject: null,
      projectToLoadId: null
    }
    dispatch({
      name: 'PROJECTS_GET'
    })
    this.actOnProject = this.actOnProject.bind(this)
  }

  componentDidMount () {
    this.subscriptions = [
      subscribe('PROJECTS_GET', (state) => {
        this.setState({
          projects: state.projects,
          currentProject: state.currentProject
        })
      }),
      subscribe('PROJECTS_UPDATE', (state) => {
        this.setState({
          projects: state.projects,
          currentProject: state.currentProject
        })
      })
    ]
  }

  componentWillUnmount () {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  loadProject (id) {
    console.warn('[state-Dashboard] [loadProject]', id)
    this.setState({
      projectToLoadId: id
    })
  }

  actOnProject(id, action) {
    const actions = {
      'load': () => {
        console.warn('[state-Dashboard] [actOnProject] load')
        this.loadProject(id)
      },
      'rename': () => {
        const project = this.state.projects.find(project => project.project.id === id)
        console.warn('[state-Dashboard] [actOnProject] rename')
        const name = window.prompt('What would you like to call this project?', project.project.name)
        if (name === undefined) {
          return
        }
        dispatch({
          name: 'PROJECTS_UPDATE',
          data: {
            id,
            name
          }
        })
      },
      'delete': () => {
        console.warn('[state-Dashboard] [actOnProject] delete')
        const confirmation = window.confirm('Are you sure?')
        if (confirmation === false) {
          return
        }
        const d = {
          name: 'PROJECTS_DELETE',
          data: {
            id
          }
        }
        dispatch(d)
          .then(state => {
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

  render() {
    if (this.state.projectToLoadId !== null) {
      return <Redirect to={`/project/${this.state.projectToLoadId}`} />
    }
    return (
      <Fragment>
        <MainToolbarContainer />
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
                        key={p.project.id}
                        id={p.project.id}
                        icon={icons.generic.project.project}
                        actions={[(() => (p !== this.state.currentProject ? 'load' : 'dummy'))(), 'rename', 'delete']}
                        onChoose={(id) => this.loadProject(id)}
                        onAction={this.actOnProject}
                      >
                        {p.project.name}
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
