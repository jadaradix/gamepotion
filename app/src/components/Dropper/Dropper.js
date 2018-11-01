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
    color: #bdc3c7;
  }
  select {
    display: block;
    margin-top: 0.5rem;
    transition: border-color 0.2s ease-in-out, opacity 0.2s ease-in-out;
    ${font}
    background-color: #dadfe1;
    color: ${colours.fore};
    border-radius: 4px;
    border-width: 2px;
    border-style: solid;
    border-color: #dadfe1;
    outline: 0;
    &[disabled] {
      opacity: 0.5;
    }
    :focus {
      border-color: ${colours.outline};
    }
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
