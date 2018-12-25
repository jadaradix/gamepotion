import React from 'react'
import styled from 'styled-components'

const StyledLeftRight = styled.section`
  // background-color: yellow;
  > div + div {
    margin-top: 2rem;
  }
  @media screen and (min-width: 840px) {
    display: grid;
    grid-template-columns: 2fr 2fr;
    grid-gap: 3rem;
    h1 {
      margin-top: 2rem;
    }
    > div + div {
      margin-top: 0;
    }
  }
  img {
    display: block;
    width: 100%;
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
