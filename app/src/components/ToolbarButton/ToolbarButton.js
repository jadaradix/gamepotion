import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { colours } from '../abstractions'

const StyledToolbarButton = styled.li`
  display: block;
  float: left;
  width: calc(3rem + 4px);
  height: calc(3rem + 4px);
  transition: background-color 0.2s ease-in-out;
  :hover {
    background-color: #6c7a89;
  }
  a {
    display: block;
    padding: 0.75rem;
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    transition: border-color 0.2s ease-in-out;
    :focus {
      outline: 0;
      border-color: ${colours.outline};
      border-radius: 4px;
    }
    img {
      display: block;
      width: 1.5rem;
      height: 1.5rem;
      // background-color: green;
    }
  }
`

const ToolbarButton = ({ route, icon, hint }) => {
  return <StyledToolbarButton title={hint}>
    <Link to={route}>
      <img src={icon} alt={hint} />
    </Link>
  </StyledToolbarButton>
}

ToolbarButton.propTypes = {
  // children: PropTypes.oneOfType([
  //   PropTypes.arrayOf(PropTypes.node),
  //   PropTypes.node
  // ]),
  route: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired
}

ToolbarButton.defaultProps = {
}

export default ToolbarButton
