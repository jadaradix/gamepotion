import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Heading2 from '../Heading2/Heading2'
import Input from '../Input/Input'
import Image from '../Image/Image'

import { get, set } from '../../localStorage'
import { font, colours } from '../../styleAbstractions'

const StyledImageChooser = styled.div`
  position: relative;
  // background-color: yellow;
  > .component--heading2 {
    height: 3rem;
    line-height: 3rem;
  }
  > .component--input {
    position: absolute;
    top: 0.5rem;
    right: 0;
    width: 12rem;
    // background-color: blue;
  }
  > div.outer {
    border: 1px solid #dadfe1;
    border-radius: 4px;
    overflow-y: scroll;
    > div.inner {
      height: 11rem;
      padding: 1rem 1rem 0 1rem;
      > div {
        position: relative;
        float: left;
        width: 8rem;
        height: 8rem;
        border-radius: 4px;
        // background-color: red;
        span {
          display: block;
          position: absolute;
          left: 0;
          top: 8rem;
          text-align: center;
          width: 8rem;
          height: 2rem;
          padding-top: 0.25rem;
          line-height: 0.75rem;
          ${font}
          font-size: 80%;
          color: ${colours.fore};
          cursor: default;
        }
      }
      > div + div {
        margin-left: 1rem;
      }
      > div.selected {
        background-color: #dadfe1;
      }
    }
  }
`

class ImageChooser extends Component {
  constructor(props) {
    super(props)
    let currentImage = this.props.currentImage || get(`component--image-chooser-current-image-${props.id}`)
    if (!currentImage && props.images.length > 0) {
      currentImage = props.images[0].id
      set(`component--image-chooser-current-image-${props.id}`, currentImage)
    }
    this.state = {
      currentImage,
      filter: get(`component--image-chooser-filter-${props.id}`) || ''
    }
    this.props.onChoose(currentImage)
    this.onUpdateFilter = this.onUpdateFilter.bind(this)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.currentImage !== this.props.currentImage) {
      this.setState({
        currentImage: nextProps.currentImage
      })
    }
  }

  onChoose(currentImage) {
    set(`component--image-chooser-current-image-${this.props.id}`, currentImage)
    this.props.onChoose(currentImage)
    this.setState({
      currentImage
    })
  }

  onUpdateFilter(filter) {
    set(`component--image-chooser-filter-${this.props.id}`, filter)
    this.setState({
      filter
    })
  }

  render() {
    const { filter } = this.state
    const images = (() => {
      if (filter === '') {
        return this.props.images
      }
      return this.props.images.filter(i => {
        return (
          i.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0
        )
      })
    })()

    return (
      <StyledImageChooser className='component--image-chooser'>
        {this.props.title.length > 0 && <Heading2>{this.props.title}</Heading2>}
        <Input value={filter} onChange={this.onUpdateFilter} placeholder='Filter...' />
        <div className='outer'>
          <div className='inner' style={{width: `${(images.length * 144) - 16}px`}}>
            {images.map(i => {
              return (
                <div key={i.id} className={this.state.currentImage === i.id ? 'selected' : ''} onClick={() => this.onChoose(i.id)}>
                  <Image src={i.url} alt={i.name} />
                  <span>{i.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </StyledImageChooser>
    )
  }
}

ImageChooser.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
  images: PropTypes.array.isRequired,
  currentImage: PropTypes.string,
  onChoose: PropTypes.func
}

ImageChooser.defaultProps = {
  title: '',
  onChoose: () => {}
}

export default ImageChooser
