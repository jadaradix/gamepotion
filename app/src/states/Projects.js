import React, { PureComponent, Fragment } from 'react'
import MainToolbar from '../component-instances/MainToolbar'
import ResponsiveContainer from '../component-instances/ResponsiveContainer'
import Button from '../components/Button/Button'

class Projects extends PureComponent {
  render() {
    return (
      <Fragment>
        <MainToolbar />
        <ResponsiveContainer>
          <Button hint='New Project' route='/projects/new'>New Project</Button>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default Projects
