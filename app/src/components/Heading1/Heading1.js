import React from 'react'
import styled from 'styled-components'
import { font, colours } from '../abstractions'

const StyledHeading1 = styled.h1`
  display: block;
  ${font}
  font-size: 200%;
  font-weight: 800;
  color: ${colours.fore};
  // background-color: red;
`

const Heading1 = ({ children }) => {
  return (
    <StyledHeading1 className='component--heading1'>
      {children}
    </StyledHeading1>
  )
}

export default Heading1
