import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { font } from '../styleAbstractions'

const StyledModule = styled.div`
  position: relative;
  // background-color: blue;
  a {
    display: block;
    width: 100%;
    height: 100%;
    img {
      display: block;
      width: 100%;
      height: 100%;
      text-indent: -5000px;
      // border-radius: 8px;
      // background-color: orange;
    }
    span {
      display: block;
      position: absolute;
      bottom: 0.5rem;
      right: 0.5rem;
      color: white;
      ${font}
      // background-color: pink;
    }
  }
`

const hackErroredImage = (e) => {
  const element = e.target
  element.style.height = '172px'
}

const Module = ({ module, isPurchased }) => {
  // console.warn('[component-Module] module', module)
  return (
    <StyledModule className='component--module'>
      <Link to={`/modules/${module.id}`}>
        <img
          src={`https://storage.googleapis.com/gmc-internal/${module.image}`}
          alt={module.name}
          onError={hackErroredImage}
        />
        {isPurchased === false &&
          <span>{module.price}</span>
        }
        {isPurchased === true &&
          <span>Purchased</span>
        }
      </Link>
    </StyledModule>
  )
}

Module.propTypes = {
  module: PropTypes.object.isRequired,
  isPurchased: PropTypes.bool
}

Module.defaultProps = {
  isPurchased: false
}

export default Module
