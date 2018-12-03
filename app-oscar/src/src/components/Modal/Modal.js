import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import icons  from '../../icons'
import { colours } from '../../styleAbstractions'

const KEY_TAB = 'Tab'
const KEY_ESC = 'Escape'

const WIDTH = '50%'
const MAX_WIDTH = '320px'

const StyledModal = styled.div`
  z-index: 2;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.75);
  .component--modal {
    width: ${WIDTH};
    max-width: ${MAX_WIDTH};
    z-index: 3;
    position: absolute;
    top: 50%;
    left: 50%;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    padding: 4rem 2rem 2rem 2rem;
    transform: translate(-50%, -50%);
    background-color: ${colours.back};
    border-radius: 4px;
    .icon--close {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      width: 1.5rem;
      height: 1.5rem;
      cursor: pointer;
      background-color: transparent;
      transition: background-color 0.1s ease-in-out;
      outline: 0;
      border-radius: 4px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
      &:focus {
        background-color: ${colours.outline};
      }
    }
  }
`

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.shouldCloseOnMouseUp = false
    this.references = {
      dialog: React.createRef()
    }
  }

  handleClose() {
    this.props.onClose()
  }

  getFocusableElements() {
    // this ref is null when when the component is shallow in enzyme
    // using mount makes the snapshots very big as the whole document
    // is snapshotted... the difference is an order of magnitude
    if (this.references.dialog.current === null) {
      return []
    }
    return Array.prototype.slice.call(
      this.references.dialog.current.querySelectorAll(
        'a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]):not(.icon--close), [tabindex="0"]'
      )
    )
  }

  componentDidMount() {
    this.focusedElementBeforeOpening = document.activeElement
    const focusableElements = this.getFocusableElements()
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    }
  }

  componentWillUnmount() {
    this.focusedElementBeforeOpening.focus()
  }

  handleMouseUp() {
    if (this.shouldCloseOnMouseUp) {
      this.handleClose()
    }
  }

  handleMouseDown(e) {
    this.shouldCloseOnMouseUp = 'overlay' in e.target.dataset
  }

  handleKeyDown(e) {
    const focusableElements = this.getFocusableElements()
    const activeElementIndex = focusableElements.indexOf(document.activeElement)
    const handleBackwardTab = () => {
      e.preventDefault()
      if (activeElementIndex > 0) {
        focusableElements[activeElementIndex - 1].focus()
      } else {
        focusableElements[focusableElements.length - 1].focus()
      }
    }
    const handleForwardTab = () => {
      e.preventDefault()
      if (activeElementIndex < focusableElements.length - 1) {
        focusableElements[activeElementIndex + 1].focus()
      } else {
        focusableElements[0].focus()
      }
    }
    switch (e.key) {
    case KEY_TAB:
      if (activeElementIndex === -1 || focusableElements.length === 1) {
        e.preventDefault()
        return
      }
      if (e.shiftKey) {
        handleBackwardTab()
      } else {
        handleForwardTab()
      }
      break
    case KEY_ESC:
      this.handleClose()
      break
    default:
    }
  }

  render() {
    return (
      <StyledModal
        role="presentation"
        data-overlay
        onMouseUp={this.handleMouseUp}
        onMouseDown={this.handleMouseDown}
      >
        <div
          role="dialog"
          aria-modal="true"
          className={classnames('component--modal', this.props.className)}
          ref={this.references.dialog}
          onKeyDown={this.handleKeyDown}
        >
          {this.props.children}
          <button
            onClick={this.handleClose}
            title='Close'
            className="icon--close"
          >
            <img src={icons.generic.modalClose} alt='' />
          </button>
        </div>
      </StyledModal>
    )
  }
}

Modal.propTypes = {
  onClose: PropTypes.func,
  className: PropTypes.string
}

Modal.defaultProps = {
  onClose: () => {},
  className: ''
}

export default Modal
