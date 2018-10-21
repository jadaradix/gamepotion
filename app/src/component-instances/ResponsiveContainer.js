import React from 'react'
import styled from 'styled-components'

const StyledResponsiveContainer = styled.div`
  .inner {
    padding: 1rem;
  }
  @media screen and (min-width: 720px) {
    max-width: 960px;
    margin: 4rem auto 0 auto;
    .inner {
      margin: 0 4rem 0 4rem;
      padding: 2rem;
      border-radius: 4px;
      box-shadow: 0 4px 20px rgb(212, 212, 212);
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

ResponsiveContainer.propTypes = {
}

ResponsiveContainer.defaultProps = {
}

export default ResponsiveContainer
