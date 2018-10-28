import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledResource = styled.div`
  audio {
    display: block;
    margin-top: 1rem;
    background-color: #dadfe1;
    border: 4px solid #dadfe1;
    border-radius: 4px;
  }
`

class Sound extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      resource: props.resource
    }
  }

  render() {
    return (
      <StyledResource>
        <audio controls>
          <source src={this.state.resource.remoteUrl} type='audio/wav' />
          <p>Your browser doesn&rsquo;t support HTML5 audio. Here is a <a href={this.state.resource.remoteUrl}>link to the audio</a>.</p>
        </audio>
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
