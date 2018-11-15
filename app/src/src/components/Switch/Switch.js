import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import uuid from 'uuid'

import { font, colours } from '../../styleAbstractions'

const StyledSwitch = styled.div`
  // nearly all of this code is stolen from http://www.designcouch.com/home/why/2013/09/19/ios7-style-pure-css-toggle/
  // thank you Jesse Couch
  height: 2rem;
  > input {
    display: none;
  }
  > label {
    float: left;
    height: 2rem;
  }
  > label + label {
    line-height: 2rem;
    margin-left: 0.6666rem;
    ${font}
    font-size: 80%;
    color: #6c7a89;
  }
  > input + label {
    display: block;
    position: relative;
    // off colour background
    background-color: ${colours.back};
    // off colour border
    box-shadow: inset 0 0 0px 2px rgb(192, 192, 192);
    text-indent: -5000px;
    width: calc(2rem + (2rem * (2 / 3)));
    border-radius: 1rem;
  }
  > input + label:before {
    content: "";
    position: absolute;
    display: block;
    width: 2rem;
    height: 2rem;
    top: 0;
    left: 0;
    border-radius: 1rem;
    transition: .25s ease-in-out;
  }
  > input + label:after {
    content: "";
    position: absolute;
    display: block;
    height: 2rem;
    width: 2rem;
    top: 0;
    left: 0;
    border-radius: 1rem;
    background-color: white;
    // off colour border
    box-shadow: inset 0 0 0 2px rgb(192, 192, 192);
    transition: .25s ease-in-out;
  }
  > input:checked + label:before {
    width: calc(2rem + (2rem * (2 / 3)));
    // on colour background
    background-color: #4cd963;
  }
  > input:checked + label:after {
    left: calc(2rem * (2 / 3));
    // on colour nub
    background-color: white;
    box-shadow: inset 0 0 0 2px rgb(192, 192, 192);
  }
`

const Switch = ({ children, checked, onChange }) => {
  const id = uuid()

  const handleOnChange = () => {
    return onChange(!checked)
  }

  return (
    <StyledSwitch className='component--switch'>
      <input type='checkbox' id={id} checked={checked} onChange={handleOnChange} />
      <label htmlFor={id} />
      <label htmlFor={id} className='label'>{children}</label>
    </StyledSwitch>
  )
}

Switch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func
}

Switch.defaultProps = {
  checked: false,
  onChange: () => {}
}

export default Switch
