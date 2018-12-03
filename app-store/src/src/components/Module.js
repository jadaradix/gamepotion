import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { font } from '../styleAbstractions'

const StyledModule = styled.div`
  position: relative;
  cursor: pointer;
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

const Module = ({ id, name, price, isPurchased }) => {
  // console.warn('[component-Module] id/isPurchased', id, isPurchased)
  return (
    <StyledModule className='component--module'>
      <Link to={`/modules/${id}`}>
        <img
          src={`https://storage.googleapis.com/gmc-internal/module-${id}.png`}
          alt={`${name} module`}
          onError={hackErroredImage}
        />
        {isPurchased === false &&
          <span>{price}</span>
        }
        {isPurchased === true &&
          <span>Purchased</span>
        }
      </Link>
    </StyledModule>
  )
}

Module.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string,
  isPurchased: PropTypes.bool
}

Module.defaultProps = {
  isPurchased: false,
  price: 'Free'
}

export default Module
