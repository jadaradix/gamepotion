import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Module from './Module'

const StyledModules = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr;
  grid-gap: 1rem;
  // background-color: red;
`

const Modules = ({ modules, boughtModuleIds }) => {
  // console.warn('[component-Modules] modules', modules)
  
  return (
    <StyledModules className='component--modules'>
      {modules.map(module => {
        const hasBought = boughtModuleIds.includes(module.id)
        return (
          <Module key={module.id} module={module} hasBought={hasBought} />
        )
      })}
    </StyledModules>
  )
}

Modules.propTypes = {
  modules: PropTypes.array.isRequired,
  boughtModuleIds: PropTypes.array.isRequired
}

Modules.defaultProps = {
}

export default Modules
