import React, { PureComponent, Fragment } from 'react'
import MainToolbar from '../component-instances/MainToolbar'
import ResponsiveContainer from '../component-instances/ResponsiveContainer'

class NewProject extends PureComponent {
  render() {
    return (
      <Fragment>
        <MainToolbar />
        <ResponsiveContainer>
          <p>
            New Project.
          </p>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default NewProject
