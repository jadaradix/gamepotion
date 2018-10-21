import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledToolbarButton = styled.li`
  display: block;
  float: left;
  width: 48px;
  height: 48px;
  transition: background-color 0.15s ease-in-out;
  :hover {
    background-color: rgb(64, 64, 64);
  }
  a {
    display: block;
    padding: 12px;
    img {
      display: block;
      width: 24px;
      height: 24px;
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
