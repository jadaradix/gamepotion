import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { font, outline } from '../abstractions'
import { withRouter } from 'react-router-dom'

const StyledButton = styled.button`
  display: block;
  padding: 0.75rem;
  transition: background-color 0.1s ease-in-out;
  ${font}
  background-color: rgb(48, 48, 48);
  color: white;
  border-radius: 4px;
  :focus {
    ${outline}
  }
  :hover {
    background-color: rgb(64, 64, 64);
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
