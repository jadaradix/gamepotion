import React from 'react'
import PropTypes from 'prop-types'

import resourceTypes from '../resourceTypes'
import icons from '../icons'

import List from '../components/List/List'
import ListItem from '../components/ListItem/ListItem'

const getLabel = (resourceTypeTypes, resources, actionClassInstance, action) => {
  const runArguments = Array.from(actionClassInstance.defaultRunArguments.values()).map((dra, i) => {
    if (resourceTypeTypes.includes(dra.type)) {
      const foundResource = resources.find(r => r.id === action.runArguments[i])
      return (foundResource !== undefined ? foundResource.name : '?')
    }
    return action.runArguments[i]
  })
  return actionClassInstance.toString(runArguments, action.appliesTo)
}

const ActionsList = ({ resources, actions, actionClassInstances, onAction }) => {

  const resourceTypeTypes = resourceTypes.map(r => r.type)

  const getEmpty = () => {
    return (
      <p className='no-actions'>There aren&rsquo;t any actions for this event.</p>
    )
  }
  const getList = (actions) => {
    let indentation = 0
    let indentation32 = 0
    return (
      <List>
        {actions.map((action, i) => {
          const actionClassInstance = actionClassInstances.find(actionClassInstance => actionClassInstance.id === action.id)
          const previousActionClassInstance = actions[i - 1] ? actionClassInstances.find(actionClassInstance => actionClassInstance.id === actions[i - 1].id) : undefined
          if (actionClassInstance.invertIndentation === true && indentation > 0) {
            indentation -= 1
          }
          if (actionClassInstance.indentation === -1 && indentation > 0) {
            indentation -= 1
          }
          if (previousActionClassInstance !== undefined && previousActionClassInstance.invertIndentation === true) {
            indentation += 1
          }
          indentation32 = indentation * 32
          if (actionClassInstance.indentation === 1) {
            indentation += 1
          }
          const label = getLabel(resourceTypeTypes, resources, actionClassInstance, action)
          const argumentsCount = actionClassInstance.defaultRunArguments.size
          const actionActions = [...(argumentsCount === 0 ? [] : ['edit']), 'delete']
          return (<ListItem id={`${i}`} key={`${i}`} icon={icons.actions[action.id]} actions={actionActions} onChoose={() => onAction(i, 'edit')} onAction={onAction} indentation={indentation32}>{label}</ListItem>)
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
