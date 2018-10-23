import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { colours } from '../abstractions'

const StyledToolbarButton = styled.li`
  display: flex;
  flex-shrink: 0;
  width: calc(3rem + 4px);
  height: calc(3rem + 4px);
  button {
    display: block;
    padding: 0.75rem;
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    outline: 0;
    background-color: #2e3131;
    transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
    :focus {
      border-color: ${colours.outline};
      border-radius: 4px;
    }
    img {
      display: block;
      width: 1.5rem;
      height: 1.5rem;
    }
    &.significant {
      background-color: #6c7a89;
    }
    &:hover {
      background-color: #6c7a89;
    }
  }
`

const handleOnClick = (history, route, onClick) => {
  if (typeof route === 'string') {
    history.push(route)
  } else if (typeof onClick === 'function') {
    return onClick()
  }
}

const ToolbarButton = ({ history, route, onClick, icon, hint, significant }) => {
  return (
    <StyledToolbarButton title={hint}>
      <button onClick={() => handleOnClick(history, route, onClick)} className={`${significant ? 'significant': ''}`}>
        <img src={icon} alt={hint} />
      </button>
    </StyledToolbarButton>
  )
}

ToolbarButton.propTypes = {
  route: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string.isRequired,
  hint: PropTypes.string.isRequired,
  significant: PropTypes.bool.isRequired
}

ToolbarButton.defaultProps = {
  onClick: null,
  significant: false
}

export default withRouter(ToolbarButton)
