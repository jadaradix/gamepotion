import React from 'react'
import styled from 'styled-components'

const StyledLeftRight = styled.section`
  background-color: yellow;
  > div + div {
    margin-top: 2rem;
  }
  @media screen and (min-width: 540px) {
    display: grid;
    grid-template-columns: 2fr 2fr;
    grid-gap: 2rem;
    > div + div {
      margin-top: 0;
    }
  }
`

const LeftRight = ({ children }) => {
  return (
    <StyledLeftRight className='component--left-right'>
      {children}
    </StyledLeftRight>
  )
}

export default LeftRight
