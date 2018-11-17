import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router'

import MainToolbarContainer from '../../component-instances/MainToolbarContainer'
import ResponsiveContainer from '../../component-instances/ResponsiveContainer'
import CustomHelmet from '../../component-instances/CustomHelmet'

import Box from '../../components/Box/Box'
import Heading1 from '../../components/Heading1/Heading1'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

import { dispatch, subscribe } from '../../state'

const StyledState = styled.div`
  .component--box {
    max-width: 480px;
    margin: 4rem auto 0 auto;
  }
  .component--button {
    display: inline-block;
  }
  .component--button + .component--button {
    margin-left: 0.5rem;
  }
`

class StateProjectNew extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentProject: {
        project: {
          name: 'My game'
        }
      }
    }
    this.update = this.update.bind(this)
    this.createProject = this.createProject.bind(this)
    this.canCreateProject = this.canCreateProject.bind(this)
  }

  componentDidMount () {
    this.subscriptions = [
      subscribe('PROJECTS_CREATE', (state) => {
        this.setState({
          currentProject: state.currentProject
        })
      })
    ]
  }

  componentWillUnmount () {
    this.subscriptions.forEach(s => s.unsubscribe())
  }

  update(prop, value) {
    this.setState({
      currentProject: {
        ...this.state.currentProject,
        project: {
          ...this.state.currentProject.project,
          [prop]: value
        }
      }
    })
  }

  createProject() {
    dispatch({
      name: 'PROJECTS_CREATE',
      data: {
        name: this.state.currentProject.project.name
      }
    })
  }

  canCreateProject () {
    const isNameValid = (this.state.currentProject.project.name.length > 0)
    return (isNameValid)
  }

  render() {
    if (this.state.currentProject.project.id !== undefined) {
      return <Redirect to={`/projects/${this.state.currentProject.project.id}`} />
    }
    return (
      <Fragment>
        <CustomHelmet
          title='Create game'
        />
        <MainToolbarContainer />
        <ResponsiveContainer>
          <StyledState>
            <Box>
              <Heading1>Create a game</Heading1>
              <Input label='What would you like to call your game?' autoFocus value={this.state.currentProject.project.name} onChange={(v) => this.update('name', v)} onDone={this.createProject} />
              <Button disabled={!this.canCreateProject()} onClick={this.createProject}>Create</Button>
              <Button onClick={this.createProject} route='/dashboard' flavour='weak'>Cancel</Button>
            </Box>
          </StyledState>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateProjectNew
