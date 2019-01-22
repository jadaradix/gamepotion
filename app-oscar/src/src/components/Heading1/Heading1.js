import React from 'react'
import styled from 'styled-components'
import { fontAlternative, colours } from '../../styleAbstractions'

const StyledHeading1 = styled.h1`
  ${fontAlternative}
  font-size: 200%;
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
