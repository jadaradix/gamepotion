import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import classnames from 'classnames'
import { withRouter } from 'react-router-dom'

import { font, colours } from '../../styleAbstractions'

const StyledToolbarButton = styled.li`
  display: flex;
  flex-shrink: 0;
  height: calc(3rem + 4px);
  background-color: #2e3131;
  button {
    display: block;
    padding: 0.75rem;
    border-width: 2px;
    border-style: solid;
    border-color: transparent;
    outline: 0;
    background-color: transparent;
    transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, opacity 0.5s ease-in-out;
    overflow: hidden;
    :focus {
      border-color: ${colours.outline};
      border-radius: 4px;
    }
    img {
      display: block;
      float: left;
      width: 1.5rem;
      height: 1.5rem;
    }
    span {
      display: block;
      height: 1.5rem;
      margin-left: 0.75rem;
      margin-right: 0.75rem;
      line-height: 1.5rem;
      color: ${colours.foreNegative};
      ${font}
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    img + span {
      margin-left: 2rem;
    }
    &.significant {
      background-color: white;
    }
    &.selected {
      background-color: #6c7a89;
    }
    &[disabled] {
      opacity: 0.25;
      cursor: not-allowed;
    }
    &:not([disabled]):not(.significant):hover {
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

const ToolbarButton = ({ match, history, route, onClick, icon, hint, significant, disabled, fixedWidth, children }) => {
  const style = {
    main: {},
    button: {},
    span: {}
  }
  if (typeof fixedWidth === 'string') {
    style.main.width = `${fixedWidth}px`
    style.button.width = '100%'
    style.button.textAlign = 'left'
  }
  const className = classnames({'significant': significant, 'selected': (match.url === route), 'disabled': disabled})
  return (
    <StyledToolbarButton title={hint} style={style.main}>
      <button onClick={() => handleOnClick(history, route, onClick)} disabled={disabled} className={className} style={style.button}>
        {icon && <img src={icon} alt={hint} className={`icon-${icon}`} />}
        {children && <span style={style.span}>{children}</span>}
      </button>
    </StyledToolbarButton>
  )
}

ToolbarButton.propTypes = {
  route: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  hint: PropTypes.string.isRequired,
  significant: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  fixedWidth: PropTypes.string
}

ToolbarButton.defaultProps = {
  onClick: null,
  significant: false,
  disabled: false
}

export default withRouter(ToolbarButton)
