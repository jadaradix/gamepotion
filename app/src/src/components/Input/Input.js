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

const getMin = (props) => {
  return (typeof props.min === 'string' ? props.min : undefined)
}

const getMax = (props) => {
  return (typeof props.max === 'string' ? props.max : undefined)
}

class Input extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      id: uuid(),
      checked: props.checked || false,
      value: getDefaultValue(props),
      required: (typeof props.required === 'boolean' ? props.required : false),
      patten: (props.type === 'password' ? '.{6,128}' : undefined),
      title: (props.type === 'password' ? '8 to 128 characters' : undefined)
    }
    this.handleOnChange = (event) => {
      this.setState({value: event.target.value, checked: event.target.checked})
      this.props.onChange(event.target.value) // which is useful?
    }
    this.handleOnDone = (event) => {
      if (this.props.onDone === null) return
      if (event.which === 13) {
        event.preventDefault()
        this.props.onDone(this.state.value)
      }
    }
    this.inputRef = React.createRef()
  }
  
  componentWillReceiveProps (nextProps) {
    this.setState({ value: nextProps.value })
  }

  render () {
    return (
      <StyledInput className='component--input'>
        {this.props.label && <label htmlFor={`component-Input-${this.state.id}`} aria-disabled={this.props.disabled}>{this.props.label}</label>}
        <input
          id={`component-Input-${this.state.id}`}
          type={this.props.type}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          required={this.state.required}
          pattern={this.state.patten}
          title={this.state.title}
          value={this.state.value}
          min={getMin(this.props)}
          max={getMax(this.props)}
          onChange={this.handleOnChange}
          onKeyDown={this.handleOnDone}
          ref={(inputRef) => {
            if (inputRef === null) {
              return
            }
            if (this.props.autoFocus === true) {
              inputRef.focus()
            }
            this.inputRef = inputRef
            this.props.onRef(inputRef)
          }}
        />
      </StyledInput>
    )
  }
}

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onRef: PropTypes.func,
  onChange: PropTypes.func,
  onDone: PropTypes.func
}

Input.defaultProps = {
  type: 'text',
  disabled: false,
  onRef: () => {},
  onChange: () => {},
  onDone: null
}

export default Input
