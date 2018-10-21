import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledList = styled.ul`
  .component--list {
    margin-left: 1.5rem;
    .component--list-item:first-of-type {
      margin-top: 0.25rem;
    }
  }
  .component--list + .component--list-item {
    margin-top: 1rem;
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

List.propTypes = {
}

List.defaultProps = {
}

export default List
