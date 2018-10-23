import React, { PureComponent, Fragment } from 'react'

import Heading1 from '../../components/Heading1/Heading1'

import MainToolbar from '../../component-instances/MainToolbar'
import ResponsiveContainer from '../../component-instances/ResponsiveContainer'

class StateProjectPreferences extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Fragment>
        <MainToolbar />
        <ResponsiveContainer>
          <Heading1>Project preferences</Heading1>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateProjectPreferences
