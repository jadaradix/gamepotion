import React from 'react'
import styled from 'styled-components'
import { font, colours } from '../../styleAbstractions'

const StyledHeading1 = styled.h1`
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
