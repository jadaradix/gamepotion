import React from 'react'
import styled from 'styled-components'

const StyledToolbarGap = styled.li`
  display: flex;
  flex-shrink: 0;
  width: 1.5rem;
  height: 3rem;
  background-color: #2e3131;
`

const ToolbarGap = () => {
  return <StyledToolbarGap />
}

export default ToolbarGap
