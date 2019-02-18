import React from 'react'
import styled from 'styled-components'

const styleAbstractions = {
  colours: {
    'fore': '#2e3131'
  },
  font: `
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-weight: 400;
    text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
  `
}

const StyledBanner = styled.div`
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgb(212, 212, 212);
  &.flavour-generic {
    background-color: #ffec8b;
  }
  &.flavour-good {
    background-color: #c8f7c5;
  }
  &.flavour-bad {
    background-color: #F8D8D4;
  }
  p {
    ${styleAbstractions.font}
    font-size: 80%;
    line-height: 1.5;
    text-align: center;
    color: ${styleAbstractions.colours.fore};
    a {
      color: inherit;
    }
  }
  `

const Banner = ({ children, flavour = 'generic' }) => {
  return (
    <StyledBanner className={`component--banner flavour-${flavour}`}>
      <p>{children}</p>
    </StyledBanner>
  )
}

export default Banner
