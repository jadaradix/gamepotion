import React from 'react'
import PropTypes from 'prop-types'
import ToolbarButton from '../ToolbarButton/ToolbarButton'
import styled from 'styled-components'

const StyledToolbar = styled.ul`
  display: block;
  list-style-type: none;
  height: calc(3rem + 4px);
  background-color: #2e3131;
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
