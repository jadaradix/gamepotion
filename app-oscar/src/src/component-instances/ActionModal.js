import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Modal from '../components/Modal/Modal'
import Heading2 from '../components/Heading2/Heading2'
import Button from '../components/Button/Button'
import Input from '../components/Input/Input'
import Dropper from '../components/Dropper/Dropper'

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

const ActionModal = ({ actionClassInstance, resources, onGood, onBad, onUpdateArgument }) => {

  const atomResources = resources
    .filter(r => r.type === 'atom')
    .map(r => {
      return {
        id: r.id,
        name: r.name
      }
    })

  const imageResources = resources
    .filter(r => r.type === 'image')
    .map(r => {
      return {
        id: r.id,
        name: r.name
      }
    })

  const getArgument = (index, name, type, value) => {
    const handleOnUpdateArgument = (v) => {
      return onUpdateArgument(index, v)
    }
    if (type === 'atom' && value === '') {
      if (atomResources.length > 0) {
        actionClassInstance.runArguments[index] = atomResources[0].id
      } else {
        actionClassInstance.runArguments[index] = '?'
      }
    }
    if (type === 'image' && value === '') {
      if (imageResources.length > 0) {
        actionClassInstance.runArguments[index] = imageResources[0].id
      } else {
        actionClassInstance.runArguments[index] = '?'
      }
    }
    switch (type) {
    case 'atom':
      return <Dropper onChoose={handleOnUpdateArgument} label={name} value={value} options={atomResources} />
    case 'image':
      return <Dropper onChoose={handleOnUpdateArgument} label={name} value={value} options={imageResources} />
    case 'generic':
    case 'number':
    default:
      return <Input onChange={handleOnUpdateArgument} label={name} value={value} onDone={() => onGood(actionClassInstance)} />
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
          <Button onClick={() => onGood(actionClassInstance)}>Done</Button>
        </div>
      </Modal>
    </StyledActionModal>
  )
}

ActionModal.propTypes = {
  actionClassInstance: PropTypes.any.isRequired,
  resources: PropTypes.array.isRequired,
  onGood: PropTypes.func,
  onBad: PropTypes.func,
  onUpdateArgument: PropTypes.func
}

ActionModal.defaultProps = {
  onGood: () => {},
  onBad: () => {},
  onUpdateArgument: () => {}
}

export default ActionModal
