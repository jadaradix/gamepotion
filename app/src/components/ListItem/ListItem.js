import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'

import { font, colours } from '../abstractions'

const StyledListItem = styled.button`
  display: block;
  width: 100%;
  height: calc(2rem + 4px);
  list-style-type: none;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  border-radius: 4px;
  background-color: transparent;
  transition: border-color 0.2s ease-in-out;
  outline: 0;
  &.selected {
    background-color: #dadfe1;
  }
  :focus {
    border-color: ${colours.outline};
  }
  img {
    display: block;
    float: left;
    width: 1.5rem;
    height: 1.5rem;
    margin-top: 0.25rem;
    margin-left: 0.25rem;
    // background-color: red;
  }
  span {
    display: block;
    float: left;
    height: 2rem;
    line-height: 2rem;
    margin-left: 0.5rem;
    ${font}
    color: ${colours.fore};
    // background-color: green;
  }
`

const ListItem = ({ icon, selected, children }) => {
  return (
    <StyledListItem className={classnames('component--list-item', {'selected': selected})}>
      <img src={icon} alt='' />
      <span>{children}</span>
    </StyledListItem>
  )
}

ListItem.propTypes = {
  icon: PropTypes.string.isRequired,
  selected: PropTypes.bool
}

ListItem.defaultProps = {
  selected: false
}

export default ListItem
