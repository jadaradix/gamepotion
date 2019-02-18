import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const styleAbstractions = {
  colours: {
    'fore': '#2e3131'
  },
  font: `
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-weight: 400;
    text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
  `
}

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
  .empty-text {
    padding-top: 2rem;
    padding-bottom: 2rem;
    ${styleAbstractions.font}
    text-align: center;
    color: ${styleAbstractions.colours.fore};
    opacity: 0.5;
    // background-color: navy;
  }
`

const List = ({ children, emptyText }) => {
  return (
    <StyledList className='component--list'>
      {children.length === 0 && emptyText.length > 0 &&
        <p className='empty-text'>{emptyText}</p>
      }
      {children}
    </StyledList>
  )
}

List.propTypes = {
  emptyText: PropTypes.string
}

List.defaultProps = {
  emptyText: ''
}

export default List
