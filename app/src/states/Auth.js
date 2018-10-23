import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'
import icons from '../icons'

import Box from '../components/Box/Box'
import Heading1 from '../components/Heading1/Heading1'
import Input from '../components/Input/Input'
import Button from '../components/Button/Button'

import MainToolbar from '../component-instances/MainToolbar'
import ResponsiveContainer from '../component-instances/ResponsiveContainer'

const StyledState = styled.div`
  .component--box {
    max-width: 480px;
    margin: 0 auto 0 auto;
  }
`

class StateDashboard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      stage: 1,
      email: '',
      password: ''
    }
    this.update = this.update.bind(this)
  }

  update(prop, value) {
    this.setState({
      [prop]: value
    })
  }

  render() {
    return (
      <Fragment>
        <MainToolbar />
        <ResponsiveContainer>
          <StyledState>
            <Box>
              <Heading1>What&rsquo;s your e-mail?</Heading1>
              <Input placeholder='james@gamemaker.club' autofocus value={this.state.email} onChange={(v) => this.update('email', v)} />
              <Button hint='Next'>Next</Button>
            </Box>
          </StyledState>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default StateDashboard
