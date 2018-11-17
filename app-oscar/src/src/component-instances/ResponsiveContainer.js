import React from 'react'
import styled from 'styled-components'

const StyledResponsiveContainer = styled.div`
  .inner {
    padding: 1rem;
  }
  .component--list + .component--button {
    margin-top: 1rem;
  }
  .component--heading1 + .component--loading {
    margin-top: 1.5rem;
  }
  .component--input + .component--input {
    margin-top: 1.5rem;
  }
  .component--input + .component--button {
    margin-top: 1.5rem;
  }
  .component--heading1 + .component--list {
    margin-top: 1rem;
  }
  .component--heading1 + .component--input {
    margin-top: 1.5rem;
  }
  // background-color: blue;
  @media screen and (min-width: 720px) {
    max-width: 960px;
    margin: 2rem auto 0 auto;
    .inner {
      margin: 0 2rem 0 2rem;
      padding: 0;
      // background-color: green;
    }
  }
`

const ResponsiveContainer = ({ children }) => {
  return (
    <StyledResponsiveContainer>
      <div className='inner'>
        {children}
      </div>
    </StyledResponsiveContainer>
  )
}

export default ResponsiveContainer
