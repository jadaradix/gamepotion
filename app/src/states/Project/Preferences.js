import React, { PureComponent, Fragment } from 'react'
import { Redirect } from 'react-router'
import styled from 'styled-components'

import Box from '../../components/Box/Box'
import Heading1 from '../../components/Heading1/Heading1'

import MainToolbarContainer from '../../component-instances/MainToolbarContainer'
import ResponsiveContainer from '../../component-instances/ResponsiveContainer'

const StyledState = styled.div`
  .component--box {
    max-width: 640px;
    margin: 4rem auto 0 auto;
  }
`

class StateAuth extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Fragment>
        <MainToolbarContainer />
        <ResponsiveContainer>
          <StyledState>
            <Box>
              <Heading1>Project preferences</Heading1>
            </Box>
          </StyledState>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateAuth
