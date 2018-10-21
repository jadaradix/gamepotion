import React from 'react'
import Toolbar from '../components/Toolbar/Toolbar'
import ToolbarButton from '../components/ToolbarButton/ToolbarButton'

import icons from '../icons'

const MainToolbar = () => {
  return (
    <Toolbar>
      <ToolbarButton route='/projects' icon={icons.generic.project} hint='Projects' />
      <ToolbarButton route='/preferences' icon={icons.generic.preferences} hint='Preferences' />
    </Toolbar>
  )
}

export default MainToolbar
