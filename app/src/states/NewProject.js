import React, { PureComponent, Fragment } from 'react'
import MainToolbar from '../component-instances/MainToolbar'

class NewProject extends PureComponent {
  render() {
    return (
      <Fragment>
        <MainToolbar />
        <p>
          New Project.
        </p>
      </Fragment>
    )
  }
}

export default NewProject
