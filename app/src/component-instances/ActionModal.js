import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Modal from '../components/Modal/Modal'
import Heading2 from '../components/Heading2/Heading2'
import Button from '../components/Button/Button'

const StyledActionModal = styled.div`
`

const ActionModal = ({ actionClassInstance, onGood, onBad }) => {
  // console.warn('[component-ActionModal] actionClassInstance', actionClassInstance)
  return (
    <StyledActionModal className='component--resource'>
      <Modal onClose={onBad} className='add-action'>
        <Heading2>{actionClassInstance.name}</Heading2>
        {Array.from(actionClassInstance.defaultRunArguments.keys()).map(k => {
          const {
            type,
            value
          } = actionClassInstance.defaultRunArguments.get(k)
          return (
            <div className='argument' key={k}>
              {k} / type::{type} / value::{value}
            </div>
          )
        })}
        <div className='decision'>
          <Button onClick={onGood}>Add action</Button>
        </div>
      </Modal>
    </StyledActionModal>
  )
}

ActionModal.propTypes = {
  onGood: PropTypes.func,
  onBad: PropTypes.func
}

ActionModal.defaultProps = {
  onGood: () => {},
  onBad: () => {}
}

export default ActionModal
