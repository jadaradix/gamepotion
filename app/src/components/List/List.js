import React from 'react'
import styled from 'styled-components'

const StyledList = styled.ul`
  .component--list {
    margin-left: 1.5rem;
    .component--list-item:first-of-type {
      margin-top: 0.25rem;
    }
  }
  .component--list + .component--list-item {
    margin-top: 0.25rem;
  }
  .component--list-item + .component--list-item {
    margin-top: 0.25rem;
  }
`

const List = ({ children }) => {
  return (
    <StyledList className='component--list'>
      {children}
    </StyledList>
  )
}

export default List
