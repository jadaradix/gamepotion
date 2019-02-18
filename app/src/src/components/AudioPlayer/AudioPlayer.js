import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import icons from '../../icons'

import Button from '../Button/Button'

const StyledAudioPlayer = styled.div`
  // background-color: yellow;
  .component--button {
    display: inline-block;
    width: 4rem;
  }
  .component--button:not(:last-of-type) {
    margin-right: 0.5rem;
  }
`

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      url: props.url,
      isPlaying: false,
      disabled: false
    }
    this.audio = new window.Audio()
    this.audio.onended = () => {
      this.stop()
    }
    this.audio.onerror = () => {
      this.setState({
        isPlaying: false,
        disabled: true
      })
    }
    this.playStop = this.playStop.bind(this)
  }

  componentDidMount() {
    this.load(this.state.url)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ url: nextProps.url })
    this.load(nextProps.url)
  }

  load(url) {
    if (typeof url === 'string') {
      this.audio.src = url
      this.audio.load()
      this.setState({
        disabled: false
      })
    } else {
      this.setState({
        disabled: true
      })
    }
  }

  play() {
    const mightBeAPromise = this.audio.play()
    if (mightBeAPromise !== undefined) {
      mightBeAPromise
        .then(() => {
          this.setState({
            isPlaying: true
          })
        })
        .catch(() => {
          this.setState({
            isPlaying: false
          })
        })
    } else {
      this.setState({
        isPlaying: true
      })
    }
  }

  stop() {
    this.audio.currentTime = 0
    this.audio.pause()
    this.setState({
      isPlaying: false
    })
  }

  playStop() {
    if (this.state.isPlaying === true) {
      this.stop()
    } else {
      this.play()
    }
  }

  render() {
    const buttonIcon = (this.state.isPlaying === false ? icons.generic.resource.sound.play : icons.generic.resource.sound.stop)
    return (
      <StyledAudioPlayer className='component--audio-player' ariaDisabled={this.state.disabled}>
        <Button icon={buttonIcon} onClick={this.playStop} disabled={this.state.disabled} />
      </StyledAudioPlayer>
    )
  }
}

AudioPlayer.propTypes = {
  url: PropTypes.oneOfType([
    PropTypes.string
  ]).isRequired
}

AudioPlayer.defaultProps = {
  url: null
}

export default AudioPlayer
