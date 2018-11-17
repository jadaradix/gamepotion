import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import uuid from 'uuid'

import { font, colours } from '../../styleAbstractions'

const StyledInput = styled.div`
  label {
    display: block;
    width: 100%;
    ${font}
    font-size: 80%;
    color: #bdc3c7;
  }
  label[aria-disabled="true"] {
    color: ${colours.fore};
    opacity: 0.5;
  }
  input {
    display: block;
    width: 100%;
    padding: 0.5rem 0 0.5rem 0;
    appearance: none;
    outline: 0;
    border: 0;
    border-bottom: 2px solid #dadfe1;
    background-color: transparent;
    letter-spacing: 0;
    transition: border-color 0.2s ease-in-out;
    ${font}
    color: ${colours.fore};
    &:focus {
      border-color: #bdc3c7;
    }
    &::selection {
      background-color: ${colours.highlight};
    }
  }
  input[disabled] {
    opacity: 0.5;
  }
  input::-webkit-input-placeholder {
    color: #dadfe1;
  }
  input&::-moz-placeholder {
    color: #dadfe1;
  }
  input:-moz-placeholder {
    color: #dadfe1;
  }
  input:-ms-input-placeholder {
    color: #dadfe1;
  }
`

const getDefaultValue = (props) => {
  if (props.value !== undefined) {
    return props.value
  }
  // hack - touch x/y refs
  return (props.type === 'number' ? undefined : '')
}

class Input extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      id: uuid(),
      autoFocus: props.autoFocus || false,
      type: props.type || 'text',
      checked: props.checked || false,
      label: props.label || '',
      value: getDefaultValue(props),
      placeholder: props.placeholder || '',
      required: (typeof props.required === 'boolean' ? props.required : false),
      patten: (props.type === 'password' ? '.{6,128}' : undefined),
      title: (props.type === 'password' ? '8 to 128 characters' : undefined),
      disabled: props.disabled || false,
      min: (typeof props.min === 'string' ? props.min : '0'),
      max: (typeof props.max === 'string' ? props.max : '0')
    }
    this.onChange = props.onChange ? props.onChange.bind(this) : () => {}
    this.onDone = props.onDone ? props.onDone.bind(this) : null
    this.handleOnChange = (event) => {
      this.setState({value: event.target.value, checked: event.target.checked})
      this.onChange(event.target.value) // which is useful?
    }
    this.handleOnDone = (event) => {
      if (this.onDone === null) return
      if (event.which === 13) {
        event.preventDefault()
        this.onDone(this.state.value)
      }
    }
    this.inputRef = React.createRef()
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ value: nextProps.value, disabled: nextProps.disabled, placeholder: nextProps.placeholder, label: nextProps.label })
  }

  render () {
    return (
      <StyledInput className='component--input'>
        {this.state.label && <label htmlFor={`component-Input-${this.state.id}`} aria-disabled={this.state.disabled}>{this.state.label}</label>}
        <input
          id={`component-Input-${this.state.id}`}
          disabled={this.state.disabled}
          autoFocus={this.state.autoFocus}
          type={this.state.type}
          required={this.state.required}
          pattern={this.state.patten}
          title={this.state.title}
          value={this.state.value}
          min={this.state.min}
          max={this.state.max}
          placeholder={this.state.placeholder}
          onChange={this.handleOnChange}
          onKeyDown={this.handleOnDone}
          ref={(inputRef) => {
            this.inputRef = inputRef
            this.props.onRef(inputRef)
          }}
        />
      </StyledInput>
    )
  }
}

Input.propTypes = {
  label: PropTypes.string,
  onRef: PropTypes.func
}

Input.defaultProps = {
  onRef: () => {}
}

export default Input
