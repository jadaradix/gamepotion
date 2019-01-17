import React from 'react'
import styled from 'styled-components'

const StyledToolbar = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  background-color: #2e3131;
  // overflow: scroll;
  // box-shadow: 0 2px 4px red;
  .component--toolbar-button:first-of-type button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`

const Toolbar = ({ children }) => (
  <StyledToolbar>
    {children}
  </StyledToolbar>
)

export default Toolbar
