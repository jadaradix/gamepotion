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
    .applies-to {
      margin-bottom: 2rem;
      // background-color: yellow;
    }
    .arguments {
      // background-color: blue;
      .argument {
        margin-bottom: 1rem;
        // background-color: red;
      }
    }
    .decision {
      // background-color: green;
    }
  }
`

const ActionModal = ({ actionClassInstance, resources, onUpdateArgument, onGood, onBad }) => {

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

  const appliesToOptions = [
    {
      id: 'this',
      name: 'This instance'
    },
    {
      id: 'other',
      name: 'Other instance'
    }
  ]

  const updateArgument = (index, value) => {
    actionClassInstance.runArguments[index] = value
    onUpdateArgument()
  }

  const updateAppliesTo = (appliesTo) => {
    actionClassInstance.appliesTo = appliesTo
    onUpdateArgument()
  }

  const getArgument = (index, name, type, values, value) => {
    if (resourcesByType.hasOwnProperty(type) && actionClassInstance.runArguments[index].length === 0) {
      if (resourcesByType[type].length > 0) {
        actionClassInstance.runArguments[index] = resourcesByType[type][0].id
      } else {
        actionClassInstance.runArguments[index] = '?'
      }
    }
    if (resourcesByType.hasOwnProperty(type)) {
      return <Dropper onChoose={(v) => updateArgument(index, v)} label={name} value={value} options={resourcesByType[type]} />
    }
    switch (type) {
    case 'boolean':
      return <Switch onChange={(v) => updateArgument(index, v)} checked={value}>{name}</Switch>
    case 'options':
      return <Dropper onChoose={(v) => updateArgument(index, v)} label={name} value={value} options={values} />
    case 'generic':
    default:
      return <Input onChange={(v) => updateArgument(index, v)} label={name} value={value} onDone={() => onGood(actionClassInstance)} />
    }
  }

  // console.warn('[component-ActionModal] actionClassInstance', actionClassInstance)
  return (
    <StyledModal>
      <Modal onClose={onBad}>
        <Heading1>{actionClassInstance.name}</Heading1>
        {actionClassInstance.caresAboutAppliesTo &&
          <div className='applies-to'>
            <Dropper onChoose={updateAppliesTo} label={'Applies to'} value={actionClassInstance.appliesTo} options={appliesToOptions} />
          </div>
        }
        <div className='arguments'>
          {Array.from(actionClassInstance.defaultRunArguments.keys()).map((k, i) => {
            const {
              name,
              type,
              values = []
            } = actionClassInstance.defaultRunArguments.get(k)
            return (
              <div className='argument' key={k}>
                {getArgument(i, name, type, values, actionClassInstance.runArguments[i])}
              </div>
            )
          })}
        </div>
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
  onUpdateArgument: PropTypes.func,
  onGood: PropTypes.func,
  onBad: PropTypes.func,
}

ActionModal.defaultProps = {
  onUpdateArgument: () => {},
  onGood: () => {},
  onBad: () => {}
}

export default ActionModal
