import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import resourceTypes from '../resourceTypes'

import Box from '../components/Box/Box'
import Dropper from '../components/Dropper/Dropper'

const StyledResource = styled.div`
  // .component--audio-player {
  //   margin-top: 1rem;
  // }
  // .component--box {
  //   margin-top: 1rem;
  // }
  .image {
    background-color: pink;
  }
`

class Atom extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      resource: props.resource
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.resource.fixed !== this.state.resource.fixed) {
      this.setState({ resource: nextProps.resource })
    }
  }

  render() {
    // const imageRemoteUrl = this.state.resource.getRemoteUrl()
    // console.warn('[resource-Sound] render', this.state.resource)
    // console.warn('[resource-Sound] imageRemoteUrl', imageRemoteUrl)

    return (
      <StyledResource>
        <Box className='image'>
          Hi!
        </Box>
      </StyledResource>
    )
  }
}

Atom.propTypes = {
  resource: PropTypes.object.isRequired,
  onUpdate: PropTypes.func
}

Atom.defaultProps = {
  onUpdate: () => {}
}

export default Atom
