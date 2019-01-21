import React from 'react'
import styled from 'styled-components'
import { fontAlternative, colours } from '../../styleAbstractions'

const StyledHeading2 = styled.h2`
  ${fontAlternative}
  font-size: 120%;
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
