import React, { PureComponent } from 'react'
import styled from 'styled-components'
import {Link} from 'gatsby'

import { appDashboard } from '../inter-router'

import logo from '../images/logo.png'
import menu from '../images/menu.svg'

const StyledHeader = styled.header`
  background-color: #ecf0f1;
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
      transition: background-color 0.2s ease-in-out;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .logo:focus {
      background-color: rgba(209, 104, 255, 0.2);
      outline: 0;
      border-radius: 4px;
    }
    .menu {
      display: block;
      position: absolute;
      top: 1.75rem;
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
            border: 2px solid transparent;
            border-radius: 4px;
            outline: 0;
            transition: background-color 0.2s ease-in-out;
            font-family: "Rubik", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          }
          a:focus {
            background-color: rgba(209, 104, 255, 0.2);
          }
          a.current {
            color: #D168FF;
          }
        }
        li.important {
          a {
            color: white;
            background: linear-gradient(#D168FF, #A537FD);
            border: 2px solid #D168FF;
            transition: border-color 0.2s ease-in-out;
          }
          a:focus {
            border: 2px solid rgb(128, 128, 128);
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
      // max-height: 14.5rem;
      max-height: 10rem;
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
        top: 2.75rem;
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
            <img src={logo} alt='Gamepotion' />
          </Link>
          <button className='menu' onClick={this.onClickMenu}>
            <img src={menu} alt='' />
          </button>
          <nav className={this.state.isMenuOpen ? 'open' : ''}>
            <ul>
              {/* <CustomLink to='/games'>Games</CustomLink> */}
              {/* <CustomLink to='/store/'>Store</CustomLink> */}
              {/* <CustomLink to='/tutorials'>Tutorials</CustomLink> */}
              <CustomLink to='/about'>About</CustomLink>
              <li><a href={appDashboard(process.env.NODE_ENV)}>Log in</a></li>
              <li className='important'><a href={appDashboard(process.env.NODE_ENV)}>Sign up</a></li>
            </ul>
          </nav>
        </div>
      </StyledHeader>
    )
  }
}

export default Header
