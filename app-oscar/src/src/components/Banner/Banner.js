import React from 'react'
import styled from 'styled-components'
import { font, colours } from '../../styleAbstractions'

const StyledBanner = styled.div`
  padding: 1rem;
  background-color: #ffec8b;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgb(212, 212, 212);
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
