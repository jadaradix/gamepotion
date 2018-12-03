import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { font, colours } from '../styleAbstractions'

const StyledButton = styled.button`
  display: block;
  padding: 0.4rem 0.8rem 0.4rem 0.8rem;
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, opacity 0.2s ease-in-out;
  ${font}
  border-radius: 4px;
  border-width: 2px;
  border-style: solid;
  outline: 0;
  &.flavour-strong {
    background-color: #2e3131;
    color: ${colours.foreNegative};
    border-color: #2e3131;
  }
  &.flavour-strong:not([disabled]):hover {
    background-color: #6c7a89;
    border-color: #6c7a89;
  }
  &.flavour-weak {
    background-color: transparent;
    color: ${colours.fore};
    border-color: transparent;
  }
  &[disabled] {
    opacity: 0.5;
  }
  :focus {
    border-color: ${colours.outline};
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
