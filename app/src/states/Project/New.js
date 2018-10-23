import React, { PureComponent, Fragment } from 'react'

import MainToolbar from '../../component-instances/MainToolbar'
import ResponsiveContainer from '../../component-instances/ResponsiveContainer'

import Heading1 from '../../components/Heading1/Heading1'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

class StateProjectNew extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Fragment>
        <MainToolbar />
        <ResponsiveContainer>
          <Heading1>Create Project</Heading1>
          <Input label='Project Name' value='New Project Name' />
          <Input label='Project Description' value='New Project Description' />
          <Button>Create</Button>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateProjectNew
