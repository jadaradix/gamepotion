import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import resourceTypes from '../resourceTypes'

import Modal from '../components/Modal/Modal'
import Heading1 from '../components/Heading1/Heading1'
import Button from '../components/Button/Button'
import Input from '../components/Input/Input'
import Dropper from '../components/Dropper/Dropper'
import Switch from '../components/Switch/Switch'

const StyledModal = styled.div`
  .component--modal {
    .component--heading1 {
      margin-bottom: 2rem;
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

  const resourcesByType = {}
  resourceTypes.forEach(rt => {
    resourcesByType[rt.type] = resources
      .filter(r => r.type === rt.type)
      .map(r => {
        return {
          id: r.id,
          name: r.name
        }
      })
  })

  const getArgument = (index, name, type, value) => {
    const handleOnUpdateArgument = (v) => {
      return onUpdateArgument(index, v)
    }
    if (actionClassInstance.runArguments[index].length === 0) {
      if (resourcesByType.hasOwnProperty(type) && resourcesByType[type].length > 0) {
        actionClassInstance.runArguments[index] = resourcesByType[type][0].id
      } else {
        actionClassInstance.runArguments[index] = '?'
      }
    }
    if (resourcesByType.hasOwnProperty(type)) {
      return <Dropper onChoose={handleOnUpdateArgument} label={name} value={value} options={resourcesByType[type]} />
    }
    switch (type) {
    case 'boolean':
      return <Switch onChange={handleOnUpdateArgument} checked={value}>{name}</Switch>
    case 'generic':
    case 'number':
    default:
      return <Input onChange={handleOnUpdateArgument} label={name} value={value} onDone={() => onGood(actionClassInstance)} />
    }
  }

  // console.warn('[component-ActionModal] actionClassInstance', actionClassInstance)
  return (
    <StyledModal className='component--resource'>
      <Modal onClose={onBad}>
        <Heading1>{actionClassInstance.name}</Heading1>
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
    </StyledModal>
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
