import React from 'react'
import PropTypes from 'prop-types'

import icons from '../icons'

import List from '../components/List/List'
import ListItem from '../components/ListItem/ListItem'

const ActionsList = ({ currentEvent, actionClassInstances, onAction }) => {

  const getEmpty = () => {
    return (
      <p className='no-actions'>There aren&rsquo;t any actions for this event.</p>
    )
  }
  const getList = (actions) => {
    let indent = 0
    return (
      <List>
        {actions.map((a, i) => {
          const actionClassInstance = actionClassInstances.find(actionClassInstance => actionClassInstance.id === a.id)
          if (actionClassInstance.dedent === true && indent > 0) {
            indent -= 1
          }
          const style = {
            'marginLeft': `${indent * 32}px`
          }
          if (actionClassInstance.indent === true) {
            indent += 1
          }
          return (<ListItem id={`${i}`} key={`${i}`} icon={icons.actions[a.id]} actions={['delete']} onAction={onAction} style={style}>{actionClassInstance.toString(a.runArguments, a.appliesTo)}</ListItem>)
        })}
      </List>
    )
  }

  if (currentEvent.length > 0) {
    return getList(currentEvent)
  } else {
    return getEmpty()
  }

}

ActionsList.propTypes = {
  currentEvent: PropTypes.any.isRequired,
  actionClassInstances: PropTypes.array.isRequired,
  onAction: PropTypes.func
}

ActionsList.defaultProps = {
  onAction: () => {}
}

export default ActionsList
