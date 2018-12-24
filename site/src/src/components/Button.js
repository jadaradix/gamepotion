import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Link} from 'gatsby'

const StyledButton = styled.div`
  a {
    display: inline-block;
    padding: 0.4rem 0.8rem 0.4rem 0.8rem;
    transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, opacity 0.2s ease-in-out;
    border-radius: 4px;
    border-width: 2px;
    border-style: solid;
    outline: 0;
    color: inherit;
    text-decoration: none;
    > span {
      display: block;
      height: 1.5rem;
      line-height: 1.5rem;
      // background-color: red;
    }
  }
  a.flavour-strong {
    background-color: #2e3131;
    color: #ffffff;
    border-color: #2e3131;
  }
  a.flavour-strong:not([disabled]):hover {
    background-color: #6c7a89;
    border-color: #6c7a89;
  }
  a.flavour-weak {
    background-color: transparent;
    color: #2e3131;
    border-color: transparent;
  }
  a[disabled] {
    opacity: 0.5;
  }
  a:focus {
    border-color: #38EF7D;
  }
`

const Button = ({ flavour, route, hint, disabled, children }) => {

  const isRouteExternal = (route.indexOf('http://') === 0 || route.indexOf('https://') === 0)

  const props = {
    disabled,
    title: hint,
    className: `flavour-${flavour}`
  }

  return (
    <StyledButton className='component--button'>
      {isRouteExternal && <a href={route} {...props}><span>{children}</span></a>}
      {!isRouteExternal && <Link to={route} {...props}><span>{children}</span></Link>}
    </StyledButton>
  )
}

Button.propTypes = {
  flavour: PropTypes.string,
  route: PropTypes.string,
  hint: PropTypes.string,
  disabled: PropTypes.bool
}

Button.defaultProps = {
  flavour: 'strong',
  hint: '',
  disabled: false
}

export default Button
