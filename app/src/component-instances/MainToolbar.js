import React from 'react'
import PropTypes from 'prop-types'

import resourceTypes from '../resourceTypes'
import icons from '../icons'

import Toolbar from '../components/Toolbar/Toolbar'
import ToolbarButton from '../components/ToolbarButton/ToolbarButton'
import ToolbarGap from '../components/ToolbarGap/ToolbarGap'

const MainToolbar = ({ currentProject, onClick }) => {
  // console.warn('[MainToolbar] currentProject', currentProject)
  return (
    <Toolbar>
      <ToolbarButton route='/dashboard' icon={icons.generic.symbol} hint='Dashboard' significant />
      {currentProject !== null &&
        <ToolbarButton fixedWidth='180' route={`/project/${currentProject.project.id}`} hint={currentProject.project.name}>
          {currentProject.project.name}
        </ToolbarButton>
      }
      {currentProject === null &&
        <ToolbarButton fixedWidth='180' disabled hint='Loading...' />
      }
      <ToolbarGap />
      <ToolbarButton onClick={() => onClick('project-run')} disabled={currentProject === null} icon={icons.generic.project.run} hint='Run project' />
      <ToolbarButton onClick={() => onClick('project-share')} disabled={currentProject === null} icon={icons.generic.project.share} hint='Share project' />
      <ToolbarGap />
      {resourceTypes.map(rt => (
        <ToolbarButton key={rt.type} onClick={() => onClick(`add-resource-${rt.type}`)} disabled={currentProject === null} icon={icons.resources[rt.type]} hint={`Add ${rt.nameSingular}`} />
      ))
      }
      <ToolbarGap />
      <ToolbarButton route='/project/preferences' disabled={currentProject === null} icon={icons.generic.preferences} hint='Project preferences' />
    </Toolbar>
  )
}

MainToolbar.propTypes = {
  currentProject: PropTypes.object,
  onClick: PropTypes.func
}

MainToolbar.defaultProps = {
  currentProject: null,
  onClick: () => {}
}

export default MainToolbar
