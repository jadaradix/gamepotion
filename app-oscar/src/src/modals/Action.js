import React, {PureComponent} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import resourceTypes from '../resourceTypes'

import Modal from '../components/Modal/Modal'
import Heading1 from '../components/Heading1/Heading1'
import Button from '../react-components/Button/Button'
import Input from '../components/Input/Input'
import Dropper from '../components/Dropper/Dropper'
import Switch from '../components/Switch/Switch'

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
    this.argumentTypes = [
      {
        types: ['boolean'],
        render: (index, value, values, name) => {
          return <Switch checked={value} onChange={(v) => this.updateArgument(index, v)}>{name}</Switch>
        },
        isValid: (value) => {
          return (typeof value === 'boolean')
        }
      },
      {
        types: ['options'],
        render: (index, value, values, name) => {
          return <Dropper label={name} value={value} options={values} onChoose={(v) => this.updateArgument(index, v)} />
        },
        isValid: (value) => {
          return (typeof value === 'string' && value.length > 0)
        }
      },
      {
        types: ['generic', 'variable'],
        render: (index, value, values, name) => {
          return <Input label={name} value={value} onChange={(v) => this.updateArgument(index, v)} onDone={() => this.props.onGood(this.props.actionClassInstance)} />
        },
        isValid: (value) => {
          return (value !== undefined && value.toString().length > 0)
        }
      },
      ...resourceTypes.map(rt => {
        return {
          types: [rt.type],
          render: (index, value, values, name) => {
            const key = `resource-type-${rt.name}`
            return <Dropper key={key} options={this.resourcesByType[rt.type]} value={value} label={rt.label} onChoose={(v) => this.updateArgument(index, v)} />
          },
          isValid: (value) => {
            return (typeof value === 'string' && value.length > 0)
          }
        }
      })
    ]
    this.state = {
      isValid: this.isValid()
    }
    this.updateAppliesTo = this.updateAppliesTo.bind(this)
  }

  updateAppliesTo(appliesTo) {
    this.props.actionClassInstance.appliesTo = appliesTo
    this.forceUpdate()
  }

  isValid() {
    const defaultRunArgumentTypes = Array.from(this.props.actionClassInstance.defaultRunArguments.entries()).map(e => e[1].type)
    const isValid = this.props.actionClassInstance.runArguments.every((ra, i) => {
      return this.argumentTypes.find(at => at.types.includes(defaultRunArgumentTypes[i])).isValid(ra)
    })
    return isValid
  }

  updateArgument(index, value) {
    this.props.actionClassInstance.runArguments[index] = value
    this.forceUpdate()
    const isValid = this.isValid()
    if (this.state.isValid === isValid) {
      this.forceUpdate()
    } else {
      this.setState({
        isValid
      })
    }
  }

  getArgument (index, name, type, values, value) {
    if (this.resourcesByType.hasOwnProperty(type) && this.props.actionClassInstance.runArguments[index].length === 0) {
      if (this.resourcesByType[type].length > 0) {
        this.props.actionClassInstance.runArguments[index] = this.resourcesByType[type][0].id
      } else {
        this.props.actionClassInstance.runArguments[index] = '?'
      }
    }
    return this.argumentTypes.find(at => at.types.includes(type)).render(index, value, values, name)
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
            <Button disabled={!this.state.isValid} onClick={() => this.props.onGood(this.props.actionClassInstance)}>Done</Button>
          </div>
        </Modal>
      </StyledModal>
    )
  }
}

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
