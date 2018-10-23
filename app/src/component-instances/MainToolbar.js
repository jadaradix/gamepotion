import React from 'react'
import icons from '../icons'

import Toolbar from '../components/Toolbar/Toolbar'
import ToolbarButton from '../components/ToolbarButton/ToolbarButton'
import ToolbarGap from '../components/ToolbarGap/ToolbarGap'

const runProject = () => {
  console.warn('[MainToolbar] [runProject]')
}

const shareProject = () => {
  console.warn('[MainToolbar] [shareProject]')
}

const addResource = (type) => {
  console.warn('[MainToolbar] [addResource]', type)
}

const MainToolbar = () => {
  return (
    <Toolbar>
      <ToolbarButton route='/dashboard' icon={icons.generic.symbol} hint='Dashboard' significant />
      <ToolbarGap />
      <ToolbarButton onClick={runProject} icon={icons.generic.project.run} hint='Run project' />
      <ToolbarButton onClick={shareProject} icon={icons.generic.project.share} hint='Share project' />
      <ToolbarGap />
      <ToolbarButton onClick={() => addResource('image')} icon={icons.resources.image} hint='Add image' />
      <ToolbarButton onClick={() => addResource('sound')} icon={icons.resources.sound} hint='Add sound' />
      <ToolbarButton onClick={() => addResource('atom')} icon={icons.resources.atom} hint='Add atom' />
      <ToolbarButton onClick={() => addResource('space')} icon={icons.resources.space} hint='Add space' />
      <ToolbarGap />
      <ToolbarButton route='/project/preferences' icon={icons.generic.preferences} hint='Project preferences' />
    </Toolbar>
  )
}

export default MainToolbar
