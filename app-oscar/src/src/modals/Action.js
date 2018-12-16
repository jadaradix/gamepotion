import React, {PureComponent} from 'react'
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

class ActionModal extends PureComponent {
  constructor(props) {
    super(props)
    this.resourcesByType = {}
    resourceTypes.forEach(rt => {
      this.resourcesByType[rt.type] = this.props.resources
        .filter(r => r.type === rt.type)
        .map(r => {
          return {
            id: r.id,
            name: r.name
          }
        })
    })
    this.updateAppliesTo = this.updateAppliesTo.bind(this)
  }

  updateAppliesTo(appliesTo) {
    this.props.actionClassInstance.appliesTo = appliesTo
    this.forceUpdate()
  }

  updateArgument(index, value) {
    this.props.actionClassInstance.runArguments[index] = value
    this.forceUpdate()
  }

  getArgument (index, name, type, values, value) {
    if (this.resourcesByType.hasOwnProperty(type) && this.props.actionClassInstance.runArguments[index].length === 0) {
      if (this.resourcesByType[type].length > 0) {
        this.props.actionClassInstance.runArguments[index] = this.resourcesByType[type][0].id
      } else {
        this.props.actionClassInstance.runArguments[index] = '?'
      }
    }
    if (this.resourcesByType.hasOwnProperty(type)) {
      return <Dropper onChoose={(v) => this.updateArgument(index, v)} label={name} value={value} options={this.resourcesByType[type]} />
    }
    switch (type) {
    case 'boolean':
      return <Switch onChange={(v) => this.updateArgument(index, v)} checked={value}>{name}</Switch>
    case 'options':
      return <Dropper onChoose={(v) => this.updateArgument(index, v)} label={name} value={value} options={values} />
    case 'generic':
    default:
      return <Input onChange={(v) => this.updateArgument(index, v)} label={name} value={value} onDone={() => this.props.onGood(this.props.actionClassInstance)} />
    }
  }

  render() {
    return (
      <StyledModal>
        <Modal onClose={this.props.onBad}>
          <Heading1>{this.props.actionClassInstance.name}</Heading1>
          {this.props.actionClassInstance.caresAboutAppliesTo &&
            <div className='applies-to'>
              <Dropper onChoose={this.updateAppliesTo} label={'Applies to'} value={this.props.actionClassInstance.appliesTo} options={appliesToOptions} />
            </div>
          }
          <div className='arguments'>
            {Array.from(this.props.actionClassInstance.defaultRunArguments.keys()).map((k, i) => {
              const {
                type,
                values = []
              } = this.props.actionClassInstance.defaultRunArguments.get(k)
              return (
                <div className='argument' key={k}>
                  {this.getArgument(i, k, type, values, this.props.actionClassInstance.runArguments[i])}
                </div>
              )
            })}
          </div>
          <div className='decision'>
            <Button onClick={() => this.props.onGood(this.props.actionClassInstance)}>Done</Button>
          </div>
        </Modal>
      </StyledModal>
    )
  }
}

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

ActionModal.propTypes = {
  actionClassInstance: PropTypes.any.isRequired,
  resources: PropTypes.array.isRequired,
  onGood: PropTypes.func,
  onBad: PropTypes.func,
}

ActionModal.defaultProps = {
  onGood: () => {},
  onBad: () => {}
}

export default ActionModal
