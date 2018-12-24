import React from 'react'
import styled from 'styled-components'

const StyledGrid = styled.section`
  display: grid;
  grid-template-columns: calc(50% - 1rem) calc(50% - 1rem);
  grid-gap: 2rem;
  // background-color: yellow;
`

const Grid = ({ children }) => {
  return (
    <StyledGrid className='component--grid'>
      {children}
    </StyledGrid>
  )
}

export default Grid
