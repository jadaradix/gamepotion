import React, { PureComponent, Fragment } from 'react'
import MainToolbar from '../component-instances/MainToolbar'
import ResponsiveContainer from '../component-instances/ResponsiveContainer'

class Preferences extends PureComponent {
  render() {
    return (
      <Fragment>
        <MainToolbar />
        <ResponsiveContainer>
          <p>
            Preferences.
          </p>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default Preferences
