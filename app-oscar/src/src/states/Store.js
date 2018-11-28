import React, { Component, Fragment } from 'react'
import styled from 'styled-components'

import { storeHome } from '../inter-router'
import { getState } from '../state'

import MainToolbarContainer from '../component-instances/MainToolbarContainer'
import ResponsiveContainer from '../component-instances/ResponsiveContainer'
import CustomHelmet from '../component-instances/CustomHelmet'

const StyledState = styled.div`
  iframe {
    width: 100%;
    height: 640px;
    background-color: red;
    border: 0;
  }
`

class StateStore extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getState().user
    }
  }

  render() {
    return (
      <Fragment>
        <CustomHelmet
          title='Store'
        />
        <MainToolbarContainer />
        <ResponsiveContainer>
          <StyledState>
            <iframe title='Store' src={storeHome('production', 'api-key-here')}>...</iframe>
          </StyledState>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateStore
