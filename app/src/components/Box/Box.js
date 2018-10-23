import React from 'react'
import styled from 'styled-components'

const StyledBox = styled.div`
  display: block;
  padding: 2rem;
  border-radius: 4px;
  box-shadow: 0 4px 20px rgb(212, 212, 212);
  background-color: #f0f3f4;
`

const Box = ({ children }) => {
  return (
    <StyledBox className='component--box'>
      {children}
    </StyledBox>
  )
}

export default Box
