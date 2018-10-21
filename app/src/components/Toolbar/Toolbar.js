import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from '../ToolbarButton/ToolbarButton'
import styled from 'styled-components'

const StyledToolbar = styled.ul`
  display: block;
  height: 48px;
  background-color: rgb(64, 64, 64);
`

const Toolbar = ({ children, href }) => (
  <StyledToolbar href={href}>
    {children}
  </StyledToolbar>
)

Toolbar.propTypes = {
}

Toolbar.defaultProps = {
}

export default Toolbar
