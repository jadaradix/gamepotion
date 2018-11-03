import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { font, colours } from '../../styleAbstractions'

const StyledImage = styled.div`
  // background-color: yellow;
  > img {
    display: block;
    max-width: calc(100% - 1rem);
    max-height: calc(100% - 1rem);
  }
  > p {
    ${font}
    color: ${colours.fore};
    opacity: 0.5;
    // background-color: orange;
  }
  > img, > p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

class Image extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasLoaded: false,
      hasErrored: false
    }
    this.doLoad(props.src)
  }

  componentWillReceiveProps (nextProps) {
    this.doLoad(nextProps.src)
  }

  componentWillUnmount() {
    if (this.image !== null) {
      this.image.removeEventListener('load', this.eventListeners.get('load'))
      this.image.removeEventListener('error', this.eventListeners.get('error'))
    }
  }

  doLoad(src) {
    this.image = new window.Image()
    this.eventListeners = new Map()
    const onLoad = () => this.onLoad()
    this.eventListeners.set('load', onLoad)
    this.image.addEventListener('load', onLoad)
    const onError = () => this.onError()
    this.eventListeners.set('error', onError)
    this.image.addEventListener('error', onError)
    this.image.src = src
  }

  onLoad() {
    this.setState({
      hasLoaded: true,
      hasErrored: false
    })
  }

  onError() {
    this.setState({
      hasLoaded: false,
      hasErrored: true
    })
  }

  render() {
    return (
      <StyledImage className='component--image'>
        {(this.state.hasErrored || this.props.src === null) && <p>No image.</p>}
        {this.state.hasLoaded && <img src={this.props.src} alt={this.props.string} />}
      </StyledImage>
    )
  }
}

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
}

Image.defaultProps = {
  alt: ''
}

export default Image


