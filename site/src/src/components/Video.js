import React from 'react'
import styled from 'styled-components'

import videoPlaceholder from '../images/video-placeholder.png'

const StyledVideo = styled.div`
  // background-color: red;
  a {
    display: block;
    text-decoration: none;
    h2 {
      // background-color: red;
    }
    span {
      display: block;
      // background-color: green;
    }
    h2 + span {
      margin-top: 0.5rem;
    }
  }
`

const Video = ({ id, name, description }) => {
  return (
    <StyledVideo className='component--video'>
      <a href={`https://www.youtube.com/watch?v=${id}`}>
        <img src={videoPlaceholder} alt={name} />
        <h2>{name}</h2>
        <span>{description}</span>
      </a>
    </StyledVideo>
  )
}

export default Video
