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

const StyledHeading1 = styled.h1`
  ${styleAbstractions.fontAlternative}
  font-size: 200%;
  color: ${styleAbstractions.colours.fore};
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
