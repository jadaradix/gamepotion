import React from 'react'
import styled from 'styled-components'

const StyledUl = styled.ul`
  li + li {
    margin-top: 0.5rem;
  }
`

const UL = ({ children }) => {
  return (
    <StyledUl className='component--ul'>
      {children}
    </StyledUl>
  )
}

export default UL
