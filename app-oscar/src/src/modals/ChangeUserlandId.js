import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Modal from '../components/Modal/Modal'
import Heading1 from '../components/Heading1/Heading1'
import Button from '../react-components/Button/Button'
import Input from '../components/Input/Input'

const StyledModal = styled.div`
  .component--modal {
    .component--heading1 {
      margin-bottom: 2rem;
    }
    .component--input {
      margin-bottom: 1rem;
    }
  }
`

const canSubmit = (value) => {
  return (value.length >= 6 && value.length <= 128)
}

const ChangeUserlandIdModal = ({ value, onGood, onBad, onUpdate }) => {

  const submit = (e) => {
    e.preventDefault()
    if (canSubmit === false) {
      return
    }
    onGood()
  }

  return (
    <StyledModal>
      <Modal onClose={onBad}>
        <Heading1>Change e-mail</Heading1>
        <form onSubmit={submit}>
          <Input type='email' label='New e-mail' value={value} onChange={(v) => onUpdate('userlandId', v)} />
          <Button disabled={!canSubmit(value)}>Save</Button>
        </form>
      </Modal>
    </StyledModal>
  )
}

ChangeUserlandIdModal.propTypes = {
  value: PropTypes.string,
  onGood: PropTypes.func,
  onBad: PropTypes.func,
  onUpdate: PropTypes.func
}
  
ChangeUserlandIdModal.defaultProps = {
  onGood: () => {},
  onBad: () => {},
  onUpdate: () => {}
}
  
export default ChangeUserlandIdModal