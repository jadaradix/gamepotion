import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Heading2 from '../Heading2/Heading2'
import Image from '../Image/Image'

import { font, colours } from '../../styleAbstractions'

const StyledImageChooser = styled.div`
  // background-color: yellow;
  > .component--heading2 {
    margin-bottom: 1rem;
  }
  > div {
    border: 1px solid #dadfe1;
    border-radius: 4px;
    overflow-y: scroll;
    > div.inner {
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
  }
`

const ImageChooser = ({ title, images, currentImage, onChoose }) => {
  return (
    <StyledImageChooser>
      {title.length > 0 && <Heading2>{title}</Heading2>}
      <div>
        <div className='inner' style={{width: `${(images.length * 144) - 16}px`}}>
          {images.map(i => {
            return (
              <div key={i.id} className={currentImage === i.id ? 'selected' : ''} onClick={() => onChoose(i.id)}>
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

ImageChooser.propTypes = {
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
