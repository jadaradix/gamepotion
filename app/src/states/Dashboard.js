import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'
import icons from '../icons'

import Button from '../components/Button/Button'
import Heading1 from '../components/Heading1/Heading1'
import List from '../components/List/List'
import ListItem from '../components/ListItem/ListItem'
import Box from '../components/Box/Box'

import MainToolbar from '../component-instances/MainToolbar'
import ResponsiveContainer from '../component-instances/ResponsiveContainer'

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
    const projects = [
      {
        id: 'project-1',
        name: 'Project 1'
      },
      {
        id: 'project-2',
        name: 'Project 2'
      },
      {
        id: 'project-3',
        name: 'Project 3'
      }
    ]
    const currentProject = projects[1]
    this.state = {
      projects,
      currentProject
    }
  }

  render() {
    return (
      <Fragment>
        <MainToolbar />
        <ResponsiveContainer>
          <StyledState>
            <Box>
              <Heading1>Switch project</Heading1>
              <List>
                {this.state.projects.map(p => <ListItem selected={p === this.state.currentProject} key={p.id} icon={icons.generic.project.project}>{p.name}</ListItem>)}
              </List>
              <Button hint='Create project' route='/project/new'>Create project</Button>
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
