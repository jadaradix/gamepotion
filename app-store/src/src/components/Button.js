import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { font, colours } from '../styleAbstractions'

const StyledButton = styled.button`
  display: block;
  padding: 0.4rem 0.8rem 0.3rem 0.8rem;
  transition: background-color 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s cubic-bezier(.4,0,.2,1), opacity 0.2s ease-in-out;
  ${font}
  border-radius: 6px;
  outline: 0;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  &.flavour-strong {
    background-color: #2e3131;
    color: ${colours.foreNegative};
  }
  &.flavour-strong:not([disabled]):hover {
    background-color: #3C4850;
  }
  &.flavour-strong:focus {
    background-color: #3C4850;
  }
  &.flavour-weak {
    background-color: #eff3f4;
    color: ${colours.fore};
  }
  &.flavour-weak:not([disabled]):hover {
  }
  &.flavour-weak:focus {
  }
  :not([disabled]):hover, :focus {
    box-shadow: 0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
  }
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
  > img {
    display: block;
    width: 2rem;
    height: 2rem;
    margin: 0 auto 0 auto;
    // background-color: blue;
  }
  > span {
    display: block;
    height: 1.5rem;
    line-height: 1.5rem;
    // background-color: red;
  }
  > img + span {
    margin-top: 0.5rem;
  }
`

const handleOnClick = (history, route, e, onClick) => {
  if (typeof route === 'string') {
    history.push(route)
  } else if (typeof onClick === 'function') {
    return onClick(e)
  }
}

const Button = ({ history, flavour, route, onClick, icon, hint, disabled, children }) => {
  return (
    <StyledButton disabled={disabled} title={hint} onClick={(e) => handleOnClick(history, route, e, onClick)} className={`component--button flavour-${flavour}`}>
      {icon && <img src={icon} alt={hint} />}
      {children && <span>{children}</span>}
    </StyledButton>
  )
}

Button.propTypes = {
  flavour: PropTypes.string,
  route: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  hint: PropTypes.string,
  disabled: PropTypes.bool
}

Button.defaultProps = {
  flavour: 'strong',
  onClick: null,
  hint: '',
  disabled: false
}

export default withRouter(Button)
