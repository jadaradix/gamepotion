import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledToolbarButton = styled.li`
  display: block;
  float: left;
  width: 48px;
  height: 48px;
  a {
    display: block;
    img {
      display: block;
      width: 24px;
      height: 24px;
      margin-top: 12px;
      margin-left: 12px;
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
