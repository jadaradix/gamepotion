import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { font, outline } from '../abstractions'

const StyledListItem = styled.li`
  display: block;
  height: 2rem;
  list-style-type: none;
  // background-color: blue;
  img {
    display: block;
    float: left;
    width: 1.5rem;
    height: 1.5rem;
    margin-top: 0.25rem;
    // background-color: red;
  }
  span {
    display: block;
    float: left;
    height: 2rem;
    line-height: 2rem;
    margin-left: 0.5rem;
    ${font}
    // background-color: green;
  }
`

const ListItem = ({ icon, children }) => {
  return (
    <StyledListItem className='component--list-item'>
      <img src={icon} alt='' />
      <span>{children}</span>
    </StyledListItem>
  )
}

ListItem.propTypes = {
  icon: PropTypes.string.isRequired
}

ListItem.defaultProps = {
}

export default ListItem
