import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import uuid from 'uuid'

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

const getNoCacheSrc =(src) => {
  return `${src}?fry-cache-${uuid()}`
}

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
    if (this.image !== undefined) {
      this.image.removeEventListener('load', this.eventListeners.get('load'))
      this.image.removeEventListener('error', this.eventListeners.get('error'))
    }
  }

  doLoad(src) {
    if (src === null) {
      return
    }
    this.image = new window.Image()
    const onLoad = () => this.onLoad()
    const onError = () => this.onError()
    this.eventListeners = new Map([
      ['load', onLoad],
      ['error', onError]
    ])
    this.image.addEventListener('load', onLoad)
    this.image.addEventListener('error', onError)
    this.image.src = src
    this.ifOnLoadFiresNoCacheSrc = getNoCacheSrc(src)
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
    // console.warn('[component-Image] this.props.src', this.props.src)
    return (
      <StyledImage className='component--image'>
        {(this.state.hasErrored || this.props.src === null) && <p>No image.</p>}
        {this.state.hasLoaded && <img src={this.ifOnLoadFiresNoCacheSrc} alt={this.props.string} />}
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


