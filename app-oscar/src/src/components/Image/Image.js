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
    width: 100%;
    ${font}
    color: ${colours.fore};
    opacity: 0.5;
    position: absolute;
    top: 50%;
    text-align: center;
    transform: translate(0, -50%);
    cursor: default;
    // background-color: orange;
  }
  > img {
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
  }

  componentDidMount() {
    this.doLoad(this.props.src)
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
      this.setState({
        hasLoaded: false,
        hasErrored: true
      })
      return
    }
    this.image = new window.Image()
    const onLoad = (event) => {
      const { width, height } = (event.path ? event.path[0] : event.target)
      this.onLoad({ width, height })
    }
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

  onLoad({ width, height }) {
    this.setState({
      hasLoaded: true,
      hasErrored: false
    })
    this.props.onLoad({ width, height })
  }

  onError() {
    this.setState({
      hasLoaded: false,
      hasErrored: true
    })
  }

  render() {
    // console.warn('[component-Image] this.image', this.image)
    return (
      <StyledImage className='component--image'>
        {(this.state.hasErrored || this.image === undefined) && <p>No image.</p>}
        {(this.state.hasLoaded && this.image !== undefined) && <img src={(this.props.dontCache ? this.image.src : this.ifOnLoadFiresNoCacheSrc)} alt={this.props.string} />}
      </StyledImage>
    )
  }
}

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onLoad: PropTypes.func,
  dontCache: PropTypes.bool
}

Image.defaultProps = {
  alt: '',
  onLoad: () => {},
  dontCache: false
}

export default Image


