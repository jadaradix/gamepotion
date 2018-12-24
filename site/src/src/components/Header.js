import React, { PureComponent } from 'react'
import styled from 'styled-components'
import {Link} from 'gatsby'

import logo from '../images/logo.png'
import menu from '../images/menu.svg'

const StyledHeader = styled.header`
  background-color: white;
  > div {
    max-width: 1080px;
    margin: 0 auto 0 auto;
    position: relative;
    padding: 1rem 2rem 0 1rem;
    .logo {
      display: block;
      width: 100%;
      max-width: 156px;
      margin: 0 auto 1rem auto;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .menu {
      display: block;
      position: absolute;
      top: 1.5rem;
      left: 2rem;
      width: 2rem;
      height: 2rem;
      background-color: transparent;
      border: 0;
      // background-color: pink;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    nav {
      overflow: hidden;
      max-height: 0;
      transition: max-height 0.5s ease;
      // background-color: red;
      ul {
        margin-top: 4px;
        padding: 0;
        padding-bottom: 1rem;
        list-style-type: none;
        // background-color: blue;
        li {
          margin-left: 4px;
          // background-color: yellow;
          a {
            padding: 0.6rem 0.8rem 0.6rem 0.8rem;
            display: inline-block;
            text-decoration: none;
            font-size: 110%;
          }
          a.current {
            color: #11998E;
          }
        }
        li.important {
          a {
            border-radius: 6px;
            color: white;
            background: linear-gradient(#38EF7D, #11998E);
          }
        }
        li + li {
          margin-top: 0.25rem;
        }
        li + li.important {
          margin-top: 0.5rem;
          margin-left: 1rem;
        }
      }
    }
    nav.open {
      max-height: 14.5rem;
    }
    @media screen and (min-width: 720px) {
      padding-bottom: 1rem;
      .menu {
        display: none;
      }
      .logo {
        max-width: 256px;
        margin-left: 0;
        margin-right: 0;
        margin-bottom: 0;
      }
      nav {
        overflow: visible;
        max-height: none;
        position: absolute;
        top: 2rem;
        right: 2rem;
        ul {
          margin-top: 0;
          li {
            float: left;
            margin-left: 0;
          }
          li + li {
            margin-top: 0;
            margin-left: 0.5rem;
          }
          li + li.important {
            margin-top: 0;
          }
        }
      }
    }
  }
`

const isCurrentCustomLink = ({ isPartiallyCurrent }) => {
  return isPartiallyCurrent ? { className: 'current' } : null
}

const CustomLink = ({ to, important, children }) => {
  return (
    <li className={important ? 'important' : undefined}>
      <Link
        to={to}
        getProps={isCurrentCustomLink}
      >
        {children}
      </Link>
    </li>
  )
}

class Header extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false
    }
    this.onClickMenu = this.onClickMenu.bind(this)
  }

  onClickMenu() {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    })
  }

  render() {
    return (
      <StyledHeader>
        <div>
          <Link to='/' className='logo'>
            <img src={logo} alt='Game Maker Club' />
          </Link>
          <button className='menu' onClick={this.onClickMenu}>
            <img src={menu} alt='' />
          </button>
          <nav className={this.state.isMenuOpen ? 'open' : ''}>
            <ul>
              <CustomLink to='/games'>Games</CustomLink>
              <CustomLink to='/store'>Store</CustomLink>
              <CustomLink to='/tutorials'>Tutorials</CustomLink>
              <CustomLink to='/about'>About</CustomLink>
              <CustomLink to='/join' important>Join</CustomLink>
            </ul>
          </nav>
        </div>
      </StyledHeader>
    )
  }
}

export default Header
