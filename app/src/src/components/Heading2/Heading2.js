import React from 'react'
import styled from 'styled-components'

const styleAbstractions = {
  colours: {
    'fore': '#2e3131'
  },
  fontAlternative: `
    font-family: "Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-weight: 400;
    text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
  `
}

const StyledHeading2 = styled.h2`
  ${styleAbstractions.fontAlternative}
  font-size: 120%;
  color: ${styleAbstractions.colours.fore};
`

const Heading2 = ({ children }) => {
  return (
    <StyledHeading2 className='component--heading2'>
      {children}
    </StyledHeading2>
  )
}

export default Heading2
