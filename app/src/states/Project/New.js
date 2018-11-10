import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router'

import MainToolbarContainer from '../../component-instances/MainToolbarContainer'
import ResponsiveContainer from '../../component-instances/ResponsiveContainer'

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
`

class StateProjectNew extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentProject: {
        project: {
          name: ''
        }
      }
    }
    this.update = this.update.bind(this)
    this.submit = this.submit.bind(this)
    this.canSubmit = this.canSubmit.bind(this)
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

  submit(e) {
    e.preventDefault()
    dispatch({
      name: 'PROJECTS_CREATE',
      data: {
        name: this.state.currentProject.project.name
      }
    })
  }

  canSubmit () {
    const isNameValid = (this.state.currentProject.project.name.length > 0)
    return (isNameValid)
  }

  render() {
    if (this.state.currentProject.project.id !== undefined) {
      return <Redirect to={`/projects/${this.state.currentProject.project.id}`} />
    }
    return (
      <Fragment>
        <MainToolbarContainer />
        <ResponsiveContainer>
          <StyledState>
            <Box>
              <form onSubmit={this.submit}>
                <Heading1>Create project</Heading1>
                <Input label='Name' autoFocus value={this.state.currentProject.project.name} onChange={(v) => this.update('name', v)} onDone={this.createProject} />
                <Button disabled={!this.canSubmit()} onClick={this.createProject}>Create</Button>
              </form>
            </Box>
          </StyledState>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateProjectNew
