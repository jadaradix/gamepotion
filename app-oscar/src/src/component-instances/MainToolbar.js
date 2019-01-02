import React from 'react'
import PropTypes from 'prop-types'

import resourceTypes from '../resourceTypes'
import icons from '../icons'

import Toolbar from '../components/Toolbar/Toolbar'
import ToolbarButton from '../components/ToolbarButton/ToolbarButton'
import ToolbarGap from '../components/ToolbarGap/ToolbarGap'

const getProjectRoute = (route, currentProject) => {
  if (currentProject === null) {
    return ''
  }
  return `/projects/${currentProject.project.id}/${route}`
}

const MainToolbar = ({ currentProject, onClick, disabled, isAccountDropdownShowing }) => {
  // console.warn('[MainToolbar] currentProject/disabled', currentProject, disabled)
  return (
    <Toolbar>
      <ToolbarButton route='/dashboard' disabled={disabled} icon={icons.generic.home} hint='Games' significant />
      <ToolbarButton route='/projects/new' disabled={disabled} icon={icons.generic.project.new} hint='Create a game' />
      {currentProject !== null &&
        <ToolbarButton fixedWidth='180' route={`/projects/${currentProject.project.id}/resources/load`} hint={currentProject.project.name}>
          {currentProject.project.name}
        </ToolbarButton>
      }
      {currentProject === null &&
        <ToolbarButton fixedWidth='180' disabled />
      }
      <ToolbarGap />
      <ToolbarButton route={getProjectRoute('play', currentProject)} disabled={disabled || currentProject === null} icon={icons.generic.project.run} hint='Play game' />
      <ToolbarButton route={getProjectRoute('preferences', currentProject)} disabled={disabled || currentProject === null} icon={icons.generic.preferences} hint='Game settings' />
      <ToolbarGap />
      {resourceTypes.map(rt => (
        <ToolbarButton key={rt.type} onClick={() => onClick(`add-resource-${rt.type}`)} disabled={disabled || currentProject === null} icon={icons.resources[rt.type]} hint={`Add ${rt.nameSingular}`} />
      ))
      }
      <ToolbarGap />
      <ToolbarButton route={'/store/'} disabled={disabled} icon={icons.generic.store} hint='Store' />
      <ToolbarButton
        onClick={() => onClick('account')}
        isDropdownShowing={isAccountDropdownShowing}
        disabled={disabled}
        icon={icons.generic.account}
        hint='My account'
        dropdownItems={
          [
            {
              route: '/account',
              name: 'My account'
            },
            {
              route: '/team',
              name: 'My team'
            },
            {
              onClick: () => onClick('log-out'),
              name: 'Log out'
            }
          ]
        }
      />
    </Toolbar>
  )
}

MainToolbar.propTypes = {
  currentProject: PropTypes.object,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isAccountDropdownShowing: PropTypes.bool
}

MainToolbar.defaultProps = {
  currentProject: null,
  onClick: () => {},
  disabled: false,
  isAccountDropdownShowing: false
}

export default MainToolbar
