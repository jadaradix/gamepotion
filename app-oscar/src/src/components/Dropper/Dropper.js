import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import uuid from 'uuid'

import { font, colours } from '../../styleAbstractions'

const StyledDropper = styled.div`
  label {
    display: block;
    width: 100%;
    ${font}
    font-size: 80%;
    color: #6c7a89;
  }
  select {
    display: block;
    height: 2rem;
    padding: 0.35rem;
    width: 100%;
    transition: border-color 0.2s ease-in-out, opacity 0.2s ease-in-out;
    ${font}
    background-color: #dadfe1;
    color: ${colours.fore};
    border-radius: 4px;
    border-width: 2px;
    border-style: solid;
    border-color: #dadfe1;
    outline: 0;
    background-image: url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0ye2ZpbGw6IzQ0NDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmFycm93czwvdGl0bGU+PHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjEuNDEgNC42NyAyLjQ4IDMuMTggMy41NCA0LjY3IDEuNDEgNC42NyIvPjxwb2x5Z29uIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIzLjU0IDUuMzMgMi40OCA2LjgyIDEuNDEgNS4zMyAzLjU0IDUuMzMiLz48L3N2Zz4=);
    background-repeat: no-repeat;
    background-position: top right;
    background-size: 10% 100%;
    -webkit-appearance: none;
    &[disabled] {
      opacity: 0.5;
    }
    :focus {
      border-color: ${colours.outline};
    }
  }
  label + select {
    margin-top: 0.5rem;
  }
`

class Dropper extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      id: uuid(),
      required: (typeof props.required === 'boolean' ? props.required : false),
      disabled: props.disabled || false,
      value: props.value
    }
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(e) {
    const value = e.target.value
    this.setState({
      value
    })
    this.props.onChoose(value)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ value: nextProps.value })
  }

  render() {
    return (
      <StyledDropper className='component--dropper'>
        {this.props.label && <label htmlFor={`component--dropper-${this.state.id}`}>{this.props.label}</label>}
        <select id={`component--dropper-${this.state.id}`} value={this.state.value} onChange={this.handleOnChange} required={this.props.required}>
          {this.props.options.map(option => {
            return <option value={option.id} key={option.id}>{option.name}</option>
          })}
        </select>
      </StyledDropper>
    )
  }
}

Dropper.propTypes = {
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  onChoose: PropTypes.func
}

Dropper.defaultProps = {
  required: false,
  disabled: false,
  value: 'none',
  onChoose: () => {}
}

export default Dropper
