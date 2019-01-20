import React from 'react'
import styled from 'styled-components'

const StyledUl = styled.ul`
  padding-left: 2rem;
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
