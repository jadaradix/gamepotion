import React, { PureComponent, Fragment } from 'react'
import MainToolbar from '../component-instances/MainToolbar'
import Button from '../components/Button/Button'

class Projects extends PureComponent {
  render() {
    return (
      <Fragment>
        <MainToolbar />
        <Button hint='New Project' route='/projects/new'>New Project</Button>
      </Fragment>
    )
  }
}

export default Projects
