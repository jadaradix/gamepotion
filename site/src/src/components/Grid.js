import React from 'react'
import styled from 'styled-components'

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: calc(50% - 1rem) calc(50% - 1rem);
  grid-gap: 2rem;
  // background-color: yellow;
  img {
    display: block;
    width: 100%;
  }
`

const Grid = ({ children }) => {
  return (
    <StyledGrid className='component--grid'>
      {children}
    </StyledGrid>
  )
}

export default Grid
