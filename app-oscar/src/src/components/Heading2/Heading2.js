import React from 'react'
import styled from 'styled-components'
import { font, colours } from '../../styleAbstractions'

const StyledHeading2 = styled.h1`
  ${font}
  font-size: 120%;
  font-weight: 800;
  color: ${colours.fore};
`

const Heading2 = ({ children }) => {
  return (
    <StyledHeading2 className='component--heading2'>
      {children}
    </StyledHeading2>
  )
}

export default Heading2
