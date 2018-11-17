import React from 'react'
import PropTypes from 'prop-types'

import resourceTypes from '../resourceTypes'
import icons from '../icons'

import Toolbar from '../components/Toolbar/Toolbar'
import ToolbarButton from '../components/ToolbarButton/ToolbarButton'
import ToolbarGap from '../components/ToolbarGap/ToolbarGap'

const getPreferencesRoute = (currentProject) => {
  if (currentProject === null) {
    return ''
  }
  return `/projects/${currentProject.project.id}/preferences`
}

const MainToolbar = ({ currentProject, onClick, disabled }) => {
  // console.warn('[MainToolbar] currentProject/disabled', currentProject, disabled)
  return (
    <Toolbar>
      <ToolbarButton route='/dashboard' disabled={disabled} icon={icons.generic.symbol} hint='Dashboard' significant />
      {currentProject !== null &&
        <ToolbarButton fixedWidth='180' route={`/projects/${currentProject.project.id}`} hint={currentProject.project.name}>
          {currentProject.project.name}
        </ToolbarButton>
      }
      {currentProject === null &&
        <ToolbarButton fixedWidth='180' disabled hint='Loading...' />
      }
      <ToolbarGap />
      <ToolbarButton onClick={() => onClick('project-run')} disabled={disabled || currentProject === null} icon={icons.generic.project.run} hint='Play game' />
      <ToolbarButton onClick={() => onClick('project-share')} disabled={disabled || currentProject === null} icon={icons.generic.project.share} hint='Share game' />
      <ToolbarGap />
      {resourceTypes.map(rt => (
        <ToolbarButton key={rt.type} onClick={() => onClick(`add-resource-${rt.type}`)} disabled={disabled || currentProject === null} icon={icons.resources[rt.type]} hint={`Add ${rt.nameSingular}`} />
      ))
      }
      <ToolbarGap />
      <ToolbarButton route={getPreferencesRoute(currentProject)} disabled={disabled || currentProject === null} icon={icons.generic.preferences} hint='Game settings' />
    </Toolbar>
  )
}

MainToolbar.propTypes = {
  currentProject: PropTypes.object,
  onClick: PropTypes.func,
  disabled: PropTypes.bool
}

MainToolbar.defaultProps = {
  currentProject: null,
  onClick: () => {},
  disabled: false
}

export default MainToolbar
