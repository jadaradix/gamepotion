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

  doLoad(src) {
    const image = new window.Image()
    image.onload = () => {
      this.setState({
        hasLoaded: true,
        hasErrored: false
      })
    }
    image.onerror = () => {
      this.setState({
        hasLoaded: false,
        hasErrored: true
      })
    }
    image.src = src
  }
    
  componentWillReceiveProps (nextProps) {
    this.doLoad(nextProps.src)
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


