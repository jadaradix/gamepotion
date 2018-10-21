import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { outline } from '../abstractions'

const StyledToolbarButton = styled.li`
  display: block;
  float: left;
  width: 3rem;
  height: 3rem;
  transition: background-color 0.15s ease-in-out;
  :hover {
    background-color: rgb(64, 64, 64);
  }
  a {
    display: block;
    padding: 0.75rem;
    :focus {
      ${outline}
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
