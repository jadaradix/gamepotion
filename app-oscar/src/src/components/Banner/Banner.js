import React from 'react'
import styled from 'styled-components'
import { font, colours } from '../../styleAbstractions'

const StyledBanner = styled.div`
  background-color: #ffec8b;
  p {
    ${font}
    color: ${colours.fore};
  }
  `

const Banner = ({ children }) => {
  return (
    <StyledBanner className='component--banner'>
      <p>{children}</p>
    </StyledBanner>
  )
}

export default Banner
