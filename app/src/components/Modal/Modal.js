import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { font, colours } from '../../styleAbstractions'

const StyledModal = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  section {
    margin: 0 auto 1rem auto;
    padding: 1rem;
    max-width: 480px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background-color: ${colours.back};
  }
`

class Modal extends Component {
  render() {
    return (
      <StyledModal className='component--modal'>
        <section>
          {this.props.children}
        </section>
      </StyledModal>
    )
  }
}

Modal.propTypes = {
  onClose: PropTypes.func
}

Modal.defaultProps = {
  onClose: () => {}
}

export default Modal


