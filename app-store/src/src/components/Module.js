import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { font } from '../styleAbstractions'
import formatPrice from '../formatPrice'

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
    span.name {
      display: block;
      position: absolute;
      bottom: 2.5rem;
      left: 0;
      width: 100%;
      color: white;
      ${font}
      font-size: 150%;
      text-align: center;
    }
    span.price, span.bought {
      display: block;
      position: absolute;
      bottom: 0.5rem;
      color: white;
      ${font}
      // background-color: pink;
    }
    span.price {
      left: 0.5rem;
    }
    span.bought {
      left: 0.5rem;
    }
  }
`

const hackErroredImage = (e) => {
  const element = e.target
  element.style.height = '172px'
}

const Module = ({ module, hasBought }) => {
  // console.warn('[component-Module] module', module)
  const price = formatPrice(module.price)
  return (
    <StyledModule className='component--module'>
      <Link to={`/modules/${module.id}`}>
        <img
          src={`https://storage.googleapis.com/gmc-internal/${module.image}`}
          alt={module.name}
          onError={hackErroredImage}
        />
        <span className='name'>{module.name}</span>
        {hasBought === false &&
          <span className='price'>{price}</span>
        }
        {hasBought === true &&
          <span className='bought'>Purchased</span>
        }
      </Link>
    </StyledModule>
  )
}

Module.propTypes = {
  module: PropTypes.object.isRequired,
  hasBought: PropTypes.bool
}

Module.defaultProps = {
  hasBought: false
}

export default Module
