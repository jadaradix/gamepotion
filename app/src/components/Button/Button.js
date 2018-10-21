import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import font from '../font'

const StyledButton = styled.button`
  display: block;
  background-color: rgb(48, 48, 48);
  color: white;
  border-radius: 4px;
  transition: background-color 0.1s ease-in-out;
  ${font}
  :hover {
    background-color: rgb(64, 64, 64);
  }
  > * {
    display: block;
    padding: 12px;
    color: inherit;
    text-decoration: none;
  }
`

const Button = ({ route, onClick, icon, hint, children }) => {
  const inside = (
    <Fragment>
      {children}
      {icon && <img src={icon} alt={hint} />}
    </Fragment>
  )
  return (
    <StyledButton title={hint} onClick={onClick}>
      {route ?
        <Link to={route}>
          {inside}
        </Link>
        :
        <span>
          {inside}
        </span>
      }
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

export default Button
