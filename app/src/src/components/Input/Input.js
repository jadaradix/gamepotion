import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

const styleAbstractions = {
  colours: {
    'fore': '#2e3131',
    'highlight': '#dadfe1'
  },
  font: `
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-weight: 400;
    text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
  `
}

const StyledInput = styled.div`
  label {
    display: block;
    width: 100%;
    ${styleAbstractions.font}
    font-size: 80%;
    color: #6c7a89;
  }
  label[aria-disabled="true"] {
    opacity: 0.5;
  }
  input {
    display: block;
    width: 100%;
    padding: 0.5rem 0 0.5rem 0;
    appearance: none;
    outline: 0;
    border: 0;
    border-radius: 0;
    border-bottom: 2px solid #dadfe1;
    background-color: transparent;
    letter-spacing: 0;
    transition: border-color 0.2s ease-in-out;
    ${styleAbstractions.font}
    color: ${styleAbstractions.colours.fore};
    -webkit-appearance: none;
    &:focus {
      border-color: #bdc3c7;
    }
    &::selection {
      background-color: ${styleAbstractions.colours.highlight};
    }
  }
  input[disabled] {
    opacity: 0.5;
  }
  input::-webkit-input-placeholder {
    color: #bdc3c7;
  }
  input&::-moz-placeholder {
    color: #bdc3c7;
  }
  input:-moz-placeholder {
    color: #bdc3c7;
  }
  input:-ms-input-placeholder {
    color: #bdc3c7;
  }
`

const getMin = (props) => {
  return (typeof props.min === 'string' ? props.min : undefined)
}

const getMax = (props) => {
  return (typeof props.max === 'string' ? props.max : undefined)
}

const getTitle = (props) => {
  return (props.type === 'password' ? '6 to 128 characters' : undefined)
}

const getPattern = (props) => {
  return (props.type === 'password' ? '.{6,128}' : undefined)
}

class Input extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      id: uuid()
    }
    this.handleOnChange = (event) => {
      this.props.onChange(event.target.value)
    }
    this.handleOnDone = (event) => {
      if (typeof this.props.onDone === 'function' && event.which === 13) {
        event.preventDefault()
        this.props.onDone(this.props.value)
      }
    }
    this.inputRef = React.createRef()
  }

  render () {
    return (
      <StyledInput className='component--input'>
        {this.props.label && <label htmlFor={`component--input-${this.state.id}`} aria-disabled={this.props.disabled}>{this.props.label}</label>}
        <input
          id={`component--input-${this.state.id}`}
          type={this.props.type}
          placeholder={this.props.placeholder}
          disabled={this.props.disabled}
          required={this.props.required}
          pattern={getPattern(this.props)}
          title={getTitle(this.props)}
          value={this.props.value}
          min={getMin(this.props)}
          max={getMax(this.props)}
          onChange={this.handleOnChange}
          onKeyDown={this.handleOnDone}
          ref={(inputRef) => {
            if (this.props.autoFocus === true && this.inputRef.current === null) {
              this.inputRef = inputRef
              inputRef.focus()
              this.props.onRef(inputRef)
            }
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
  required: PropTypes.bool,
  checked: PropTypes.bool,
  autoFocus: PropTypes.bool,
  onRef: PropTypes.func,
  onChange: PropTypes.func,
  onDone: PropTypes.func
}

Input.defaultProps = {
  type: 'text',
  disabled: false,
  required: false,
  checked: false,
  onRef: () => {},
  onChange: () => {},
  onDone: null
}

export default Input
