import React from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'

import modules from '../modules'

import Heading1 from '../components/Heading1'

const StyledRoute = styled.div`

`

class Home extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const currentModule = modules.find(m => m.id === this.props.match.params.id)
    if (currentModule === undefined) {
      return <Redirect to='/' />
    }

    return (
      <StyledRoute>
        <section>
          <Heading1>{currentModule.name}</Heading1>
        </section>
      </StyledRoute>
    )
  }
}

export default Home
