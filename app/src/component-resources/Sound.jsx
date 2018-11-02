import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import resourceTypes from '../resourceTypes'

import Box from '../components/Box/Box'
import AudioPlayer from '../components/AudioPlayer/AudioPlayer'
import Dropper from '../components/Dropper/Dropper'

const StyledResource = styled.div`
  .component--box {
    margin-top: 1rem;
  }
`

class Sound extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      resource: props.resource
    }
    this.onChooseFixed = this.onChooseFixed.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.resource.fixed !== this.state.resource.fixed) {
      this.setState({ resource: nextProps.resource })
    }
  }

  onChooseFixed(fixed) {
    if (fixed === 'none') {
      fixed = null
    }
    this.props.onUpdate({
      fixed
    })
  }

  render() {
    const fixedOptions = [
      ...resourceTypes.find(rt => rt.type === 'sound').fixed.map(o => {
        return {
          id: o,
          name: o
        }
      }),
      {
        id: 'none',
        name: '<None>'
      }
    ]
    const fixedValue = (this.state.resource.fixed === null ? 'none' : this.state.resource.fixed)
    const remoteUrl = this.state.resource.getRemoteUrl()

    // console.warn('[resource-Sound] render', this.state.resource)
    // console.warn('[resource-Sound] remoteUrl', remoteUrl)

    return (
      <StyledResource>
        <AudioPlayer url={remoteUrl} />
        <Box>
          <Dropper label='Choose a Game Maker Club file' onChoose={this.onChooseFixed} options={fixedOptions} value={fixedValue} />
        </Box>
      </StyledResource>
    )
  }
}

Sound.propTypes = {
  resource: PropTypes.object.isRequired,
  onUpdate: PropTypes.func
}

Sound.defaultProps = {
  onUpdate: () => {}
}

export default Sound
