import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Module from './Module'

const StyledModules = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr;
  grid-gap: 1rem;
  max-width: 480px;
  // background-color: red;
  `

const Modules = ({ modules, onChoose }) => {
  // console.warn('[component-Bricks] modules', modules)
  return (
    <StyledModules className='component--modules'>
      {modules.map(module => {
        const {
          id,
          name
        } = module
        return (
          <Module key={id} id={id} name={name} onClick={() => onChoose(id)} />
        )
      })}
    </StyledModules>
  )
}

Modules.propTypes = {
  modules: PropTypes.array.isRequired,
  onChoose: PropTypes.func
}

Modules.defaultProps = {
  onChoose: () => {}
}

export default Modules
