import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import resourceTypes from '../resourceTypes'

import Box from '../components/Box/Box'
import AudioPlayer from '../components/AudioPlayer/AudioPlayer'
import Dropper from '../components/Dropper/Dropper'

const StyledResource = styled.div`
  section.split-two {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    @media screen and (min-width: 720px) {
      grid-template-columns: 2fr 2fr;
      grid-gap: 2rem;
    }
  }
  section + section {
    margin-top: 2rem;
  }
`

class ResourceSound extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      resource: props.resource
    }
    this.onChooseFixed = this.onChooseFixed.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resource.fixed !== this.state.resource.fixed) {
      this.setState({ resource: nextProps.resource })
    }
  }

  onUpdate(data) {
    this.props.onUpdate(data)
  }

  onChooseFixed(fixed) {
    if (fixed === 'none') {
      fixed = null
    }
    this.onUpdate({
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
        <section className='resource'>
          <AudioPlayer url={remoteUrl} />
        </section>
        <section className='split-two'>
          <Box>
              <Dropper label='Choose a Game Maker Club file' onChoose={this.onChooseFixed} options={fixedOptions} value={fixedValue} />
          </Box>
          <Box>
            <p>(upload goes here)</p>
          </Box>
        </section>
      </StyledResource>
    )
  }
}

ResourceSound.propTypes = {
  resource: PropTypes.object.isRequired,
  onUpdate: PropTypes.func
}

ResourceSound.defaultProps = {
  onUpdate: () => {}
}

export default ResourceSound
