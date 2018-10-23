import React, { PureComponent, Fragment } from 'react'
import { Redirect } from 'react-router'

import MainToolbar from '../../component-instances/MainToolbar'
import ResponsiveContainer from '../../component-instances/ResponsiveContainer'

import Heading1 from '../../components/Heading1/Heading1'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

import dispatch from '../../state'

// <Input label='Project Description' value='New Project Description' />

class StateProjectNew extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      created: false,
      project: {
        name: ''
      }
    }
    this.createProject = this.createProject.bind(this)
    this.updateProject = this.updateProject.bind(this)
  }

  createProject() {
    const d = {
      name: 'PROJECTS_CREATE',
      data: {
        name: this.state.project.name
      }
    }
    dispatch(d)
      .then(() => {
        this.setState({
          created: true
        })
      })
  }

  updateProject(prop, value) {
    this.setState({
      project: {
        ...this.state.project,
        [prop]: value
      }
    })
  }

  render() {
    if (this.state.created === true) {
      return <Redirect to="/dashboard" />
    }
    return (
      <Fragment>
        <MainToolbar />
        <ResponsiveContainer>
          <Heading1>Create Project</Heading1>
          <Input label='Name' autoFocus value={this.state.project.name} onChange={(v) => this.updateProject('name', v)} onDone={this.createProject} />
          <Button onClick={this.createProject}>Create</Button>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateProjectNew
