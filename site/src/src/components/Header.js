import React from 'react'
import styled from 'styled-components'
import {Link} from 'gatsby'

import logo from '../images/logo.png'

const StyledHeader = styled.header`
  padding: 1rem;
  background-color: white;
  a {
    display: block;
    width: 100%;
    max-width: 128px;
    margin: 0 auto 0 auto;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
`

const Header = () => {
  return (
    <StyledHeader>
      <Link to='/'>
        <img src={logo} alt='Game Maker Club' />
      </Link>
    </StyledHeader>
  )
}

export default Header
