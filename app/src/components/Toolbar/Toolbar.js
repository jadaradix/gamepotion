import React from 'react'
import styled from 'styled-components'

const StyledToolbar = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  background-color: #2e3131;
  box-shadow: 0 4px 20px rgb(212, 212, 212);
`

const Toolbar = ({ children, href }) => (
  <StyledToolbar href={href}>
    {children}
  </StyledToolbar>
)

export default Toolbar
