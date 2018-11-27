import React from 'react'
import styled from 'styled-components'

import { font, colours } from '../styleAbstractions'

const StyledVersion = styled.span`
  display: block;
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 0.25rem;
  ${font}
  font-size: 80%;
  background-color: #2e3131;
  color: ${colours.foreNegative};
  border-top-left-radius: 4px;
`

const Version = () => {
  return (
    <StyledVersion>
      v{process.env.REACT_APP_VERSION}
    </StyledVersion>
  )
}

export default Version
