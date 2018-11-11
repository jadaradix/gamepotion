import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Modal from '../components/Modal/Modal'
import Heading2 from '../components/Heading2/Heading2'
import Button from '../components/Button/Button'

import Input from '../components/Input/Input'

const StyledActionModal = styled.div`
  .component--modal {
    .component--heading2 {
      margin-bottom: 1rem;
    }
    .argument {
      margin-bottom: 1rem;
      // background-color: red;
    }
    .decision {
      // background-color: green;
    }
  }
`

const ActionModal = ({ actionClassInstance, onGood, onBad }) => {

  const getArgumentValue = (type, v) => {
    switch (type) {
    case 'number':
      return parseInt(v, 10) || 0 // NaN
    default:
      return v
    }
  }

  const getArgument = (index, name, type, value) => {
    const onUpdateArgument = (v) => {
      actionClassInstance.runArguments[index] = getArgumentValue(type, v)
    }
    switch (type) {
    default:
      return <Input label={name} value={value} onChange={onUpdateArgument} onDone={() => onGood(actionClassInstance)} />
    }
  }

  // console.warn('[component-ActionModal] actionClassInstance', actionClassInstance)
  return (
    <StyledActionModal className='component--resource'>
      <Modal onClose={onBad}>
        <Heading2>{actionClassInstance.name}</Heading2>
        {Array.from(actionClassInstance.defaultRunArguments.keys()).map((k, i) => {
          const {
            type
          } = actionClassInstance.defaultRunArguments.get(k)
          return (
            <div className='argument' key={k}>
              {getArgument(i, k, type, actionClassInstance.runArguments[i])}
            </div>
          )
        })}
        <div className='decision'>
          <Button onClick={() => onGood(actionClassInstance)}>Add action</Button>
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
