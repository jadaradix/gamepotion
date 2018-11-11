import React from 'react'
import PropTypes from 'prop-types'

import icons from '../icons'

import List from '../components/List/List'
import ListItem from '../components/ListItem/ListItem'

const argumentTypesToRunArgument = new Map([
  ['atom', (resources, runArgument) => {
    const foundResource = resources.find(r => r.id === runArgument && r.type === 'atom')
    return (foundResource !== undefined ? foundResource.name : '?')
  }],
  ['image', (resources, runArgument) => {
    const foundResource = resources.find(r => r.id === runArgument && r.type === 'image')
    return (foundResource !== undefined ? foundResource.name : '?')
  }]
])

const getLabel = (resources, actionClassInstance, action) => {
  const runArguments = Array.from(actionClassInstance.defaultRunArguments.values()).map((dra, i) => {
    const foundArgumentTypesToRunArgument = argumentTypesToRunArgument.get(dra.type)
    if (typeof foundArgumentTypesToRunArgument === 'function') {
      return foundArgumentTypesToRunArgument(resources, action.runArguments[i])
    } else {
      return action.runArguments[i]
    }
  })
  return actionClassInstance.toString(runArguments, action.appliesTo)
}

const ActionsList = ({ resources, actions, actionClassInstances, onAction }) => {

  const getEmpty = () => {
    return (
      <p className='no-actions'>There aren&rsquo;t any actions for this event.</p>
    )
  }
  const getList = (actions) => {
    let indent = 0
    return (
      <List>
        {actions.map((action, i) => {
          const actionClassInstance = actionClassInstances.find(actionClassInstance => actionClassInstance.id === action.id)
          if (actionClassInstance.dedent === true && indent > 0) {
            indent -= 1
          }
          const style = {
            'marginLeft': `${indent * 32}px`
          }
          if (actionClassInstance.indent === true) {
            indent += 1
          }
          const label = getLabel(resources, actionClassInstance, action)
          return (<ListItem id={`${i}`} key={`${i}`} icon={icons.actions[action.id]} actions={['delete']} onAction={onAction} style={style}>{label}</ListItem>)
        })}
      </List>
    )
  }

  if (actions.length > 0) {
    return getList(actions)
  } else {
    return getEmpty()
  }

}

ActionsList.propTypes = {
  resources: PropTypes.array.isRequired,
  actions: PropTypes.array.isRequired,
  actionClassInstances: PropTypes.array.isRequired,
  onAction: PropTypes.func
}

ActionsList.defaultProps = {
  onAction: () => {}
}

export default ActionsList
