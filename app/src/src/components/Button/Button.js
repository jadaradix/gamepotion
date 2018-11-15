import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { font, colours } from '../../styleAbstractions'

const StyledButton = styled.button`
  display: block;
  padding: 0.4rem 0.8rem 0.4rem 0.8rem;
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, opacity 0.2s ease-in-out;
  ${font}
  background-color: #2e3131;
  color: ${colours.foreNegative};
  border-radius: 4px;
  border-width: 2px;
  border-style: solid;
  border-color: #2e3131;
  outline: 0;
  &[disabled] {
    opacity: 0.5;
  }
  :focus {
    border-color: ${colours.outline};
  }
  &:not([disabled]):hover {
    background-color: #6c7a89;
    border-color: #6c7a89;
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

const handleOnClick = (history, route, onClick) => {
  if (typeof route === 'string') {
    history.push(route)
  } else if (typeof onClick === 'function') {
    return onClick()
  }
}

const Button = ({ history, route, onClick, icon, hint, disabled, children }) => {
  return (
    <StyledButton disabled={disabled} title={hint} onClick={() => handleOnClick(history, route, onClick)} className='component--button'>
      {icon && <img src={icon} alt={hint} />}
      {children && <span>{children}</span>}
    </StyledButton>
  )
}

Button.propTypes = {
  route: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  hint: PropTypes.string,
  disabled: PropTypes.bool
}

Button.defaultProps = {
  onClick: null,
  hint: '',
  disabled: false
}

export default withRouter(Button)
