import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Image from '../Image/Image'

import { font, colours } from '../../styleAbstractions'

const StyledImageChooser = styled.div`
  border: 1px solid #dadfe1;
  border-radius: 4px;
  overflow-y: scroll;
  // background-color: yellow;
  > div {
    height: 10rem;
    padding: 1rem;
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
        line-height: 2rem;
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
`

const ImageChooser = ({ images, currentImage, onChoose }) => {
  return (
    <StyledImageChooser>
      <div style={{width: `${(images.length * 144) - 16}px`}}>
        {images.map(i => {
          return (
            <div className={currentImage === i.id ? 'selected' : ''} onClick={() => onChoose(i.id)}>
              <Image src={i.url} alt={i.name} />
              <span>{i.name}</span>
            </div>
          )
        })}
      </div>
    </StyledImageChooser>
  )
}

ImageChooser.propTypes = {
  images: PropTypes.array.isRequired,
  currentImage: PropTypes.string,
  onChoose: PropTypes.func
}

ImageChooser.defaultProps = {
  onChoose: () => {}
}

export default ImageChooser
