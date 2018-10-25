import React, { PureComponent, Fragment } from 'react'
import { Redirect } from 'react-router'

import MainToolbarContainer from '../../component-instances/MainToolbarContainer'
import ResponsiveContainer from '../../component-instances/ResponsiveContainer'

import Heading1 from '../../components/Heading1/Heading1'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

import { dispatch, subscribe } from '../../state'

// <Input label='Project Description' value='New Project Description' />

class StateProjectNew extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      created: false,
      currentProject: {
        name: ''
      }
    }
    this.createProject = this.createProject.bind(this)
    this.updateProject = this.updateProject.bind(this)
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

  createProject() {
    dispatch({
      name: 'PROJECTS_CREATE',
      data: {
        name: this.state.currentProject.name
      }
    })
  }

  updateProject(prop, value) {
    this.setState({
      currentProject: {
        ...this.state.currentProject,
        [prop]: value
      }
    })
  }

  render() {
    if (this.state.currentProject.id !== undefined) {
      return <Redirect to={`/project/${this.state.currentProject.id}`} />
    }
    return (
      <Fragment>
        <MainToolbarContainer />
        <ResponsiveContainer>
          <Heading1>Create Project</Heading1>
          <Input label='Name' autoFocus value={this.state.currentProject.name} onChange={(v) => this.updateProject('name', v)} onDone={this.createProject} />
          <Button onClick={this.createProject}>Create</Button>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateProjectNew
