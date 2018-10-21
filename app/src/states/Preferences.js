import React, { PureComponent, Fragment } from 'react'
import MainToolbar from '../component-instances/MainToolbar'

class Preferences extends PureComponent {
  render() {
    return (
      <Fragment>
        <MainToolbar />
        <p>
          Preferences.
        </p>
      </Fragment>
    )
  }
}

export default Preferences
