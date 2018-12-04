import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import styled from 'styled-components'

import icons from '../icons'
import { font, colours } from '../styleAbstractions'

import Button from '../components/Button/Button'
import Heading1 from '../components/Heading1/Heading1'
import List from '../components/List/List'
import ListItem from '../components/ListItem/ListItem'
import Loading from '../components/Loading/Loading'
import Box from '../components/Box/Box'

import MainToolbarContainer from '../component-instances/MainToolbarContainer'
import ResponsiveContainer from '../component-instances/ResponsiveContainer'

import { getState, dispatch, subscribe } from '../state'

const StyledState = styled.div`
  section.split-two {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    @media screen and (min-width: 720px) {
      grid-template-columns: 2fr 2fr;
      grid-gap: 2rem;
    }
  }
  section + section {
    margin-top: 1rem;
  }
  p {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    ${font}
    color: ${colours.fore};
  }
`

class StateDashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      // projects
      projects: null,
      currentProject: null,
      projectToLoadId: null,
      // feeds
      feeds: getState().feeds,
      // feedItemToLoadId: null
    }
    dispatch({
      name: 'PROJECTS_GET'
    })
    dispatch({
      name: 'FEEDS_GET',
      data: {
        id: 'news'
      }
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
      }),
      subscribe('PROJECTS_DELETE', (state) => {
        this.setState({
          projects: state.projects,
          currentProject: state.currentProject
        })
      }),
      subscribe('FEEDS_GET', (state) => {
        console.warn('FEEDS_GET', state)
        this.setState({
          feeds: state.feeds
        })
      })
    ]
  }

  componentWillUnmount () {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  loadProject (projectToLoadId) {
    console.warn('[state-Dashboard] [loadProject]', projectToLoadId)
    this.setState({
      projectToLoadId
    })
  }

  loadFeedItem (feedId, feedItemToLoadId) {
    console.warn('[state-Dashboard] [loadFeedItem] feedId/feedItemToLoadId', feedId, feedItemToLoadId)
    // this.setState({
    //   feedItemToLoadId
    // })
  }

  actOnProject(id, action) {
    const project = this.state.projects.find(project => project.project.id === id)
    const actions = {
      'load': () => {
        console.warn('[state-Dashboard] [actOnProject] load', id)
        this.loadProject(id)
      },
      'rename': () => {
        console.warn('[state-Dashboard] [actOnProject] rename', id)
        const name = window.prompt(`What would you like to call ${project.project.name}`, project.project.name)
        if (name === null || name.length === 0) {
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
        console.warn('[state-Dashboard] [actOnProject] delete', id)
        const confirmation = window.confirm(`Are you sure you want to delete ${project.project.name}?`)
        if (confirmation === false) {
          return
        }
        dispatch({
          name: 'PROJECTS_DELETE',
          data: {
            id
          }
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
      return <Redirect to={`/projects/${this.state.projectToLoadId}`} />
    }

    const newsFeed = this.state.feeds.get('news')
    return (
      <Fragment>
        <MainToolbarContainer />
        <ResponsiveContainer>
          <StyledState>
            <section className='split-two'>
              <Box>
                {this.state.projects === null ? 
                  <Loading />
                  :
                  <Fragment>
                    <Heading1>Games</Heading1>
                    <List emptyText='You haven&rsquo;t created any games yet.'>
                      {this.state.projects.map(p => (
                        <ListItem
                          selected={p === this.state.currentProject}
                          key={p.project.id}
                          id={p.project.id}
                          icon={icons.generic.project.project}
                          actions={['load', 'rename', 'delete']}
                          onChoose={(id) => this.loadProject(id)}
                          onAction={this.actOnProject}
                        >
                          {p.project.name}
                        </ListItem>
                      ))}
                    </List>
                    <Button route='/projects/new'>Create a game</Button>
                  </Fragment>
                }
              </Box>
              <Box>
                {newsFeed === undefined ? 
                  <Loading />
                  :
                  <Fragment>
                    <Heading1>News</Heading1>
                    <List emptyText='There&rsquo;s no news yet.'>
                      {newsFeed.map(n => (
                        <ListItem
                          key={n.id}
                          id={n.id}
                          icon={icons.generic.project.project}
                          onChoose={(id) => this.loadFeedItem('news', id)}
                        >
                          {n.title}
                        </ListItem>
                      ))}
                    </List>
                  </Fragment>
                }
              </Box>
            </section>
          </StyledState>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateDashboard
