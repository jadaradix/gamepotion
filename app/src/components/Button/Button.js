import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { font, colours } from '../abstractions'
import { withRouter } from 'react-router-dom'

const StyledButton = styled.button`
  display: block;
  padding: 0.7rem;
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  ${font}
  background-color: #2e3131;
  color: white;
  border-radius: 4px;
  border-width: 2px;
  border-style: solid;
  border-color: #2e3131;
  :focus {
    outline: 0;
    border-color: ${colours.outline};
  }
  :hover {
    background-color: #6c7a89;
  }
`

const Button = ({ history, route, onClick, icon, hint, children }) => {
  const handleOnClick = () => {
    if (typeof route === 'string') {
      history.push(route)
    } else if (typeof onClick === 'function') {
      return onClick()
    }
  }
  return (
    <StyledButton title={hint} onClick={handleOnClick} className='component--button'>
      {children}
      {icon && <img src={icon} alt={hint} />}
    </StyledButton>
  )
}

Button.propTypes = {
  route: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  hint: PropTypes.string.isRequired
}

Button.defaultProps = {
  onClick: null
}

export default withRouter(Button)
