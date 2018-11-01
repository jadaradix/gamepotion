import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import resourceTypes from '../resourceTypes'
import { font, colours } from '../styleAbstractions'

import Box from '../components/Box/Box'
import Dropper from '../components/Dropper/Dropper'

const StyledResource = styled.div`
  @keyframes no-resource {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  audio {
    display: block;
    margin-top: 1rem;
    background-color: #dadfe1;
    border: 4px solid #dadfe1;
    border-radius: 4px;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
  audio.visible {
    visibility: visible;
    opacity: 1;
  }
  .no-resource {
    margin-top: 1rem;
    ${font}
    color: ${colours.fore};
    animation: no-resource 0.5s;
  }
  .component--box {
    margin-top: 1rem;
  }
`

class Sound extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      resource: props.resource,
      fileLoaded: false,
      fileErrored: false
    }
    this.onLoad = this.onLoad.bind(this)
    this.onError = this.onError.bind(this)
    this.onChooseFixed = this.onChooseFixed.bind(this)
  }

  // <Button onClick={this.renameToTest}>Rename to Test</Button>
  // renameToTest () {
  //   this.props.onUpdate({ name: 'Test' })
  // }

  componentWillReceiveProps (nextProps) {
    if (nextProps.resource.fixed !== this.state.resource.fixed) {
      const fileLoaded = (this.state.fileLoaded && nextProps.resource.fixed !== null)
      this.setState({ resource: nextProps.resource, fileLoaded, fileErrored: false })
    }
  }

  onLoad() {
    console.warn('xxx onLoad')
    this.setState({
      fileLoaded: true
    })
  }

  onError() {
    this.setState({
      fileErrored: true
    })
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
    console.warn('xxx render', this.state.resource)
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

    return (
      <StyledResource>
        {!this.state.fileErrored ?
          <audio onCanPlayThrough={this.onLoad} className={this.state.fileLoaded ? 'visible' : ''} controls>
            <source src={remoteUrl} onError={this.onError} type='audio/wav' />
            <p>Your browser doesn&rsquo;t support HTML5 audio. Here is a <a href={remoteUrl}>link to the audio</a>.</p>
          </audio>
          :
          <p className='no-resource'>You haven&rsquo;t chosen a file yet.</p>
        }
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
