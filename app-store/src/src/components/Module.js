import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledModule = styled.div`
  // background-color: blue;
  img {
    display: block;
    width: 100%;
    height: 100%;
    text-indent: -5000px;
    // border-radius: 8px;
    // background-color: orange;
  }
  .is-purchased {
    display: block;
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    color: white;
    // background-color: pink;
  }
`

const hackErroredImage = (e) => {
  const element = e.target
  element.style.height = '172px'
}

const Module = ({ id, name, isPurchased, onClick }) => {
  // console.warn('[component-Module] id/isPurchased', id, isPurchased)
  return (
    <StyledModule className='component--module'>
      <img
        src={`https://storage.googleapis.com/gmc-internal/module-${id}.png`}
        alt={`${name} module`}
        onError={hackErroredImage}
        onClick={onClick}
      />
      {isPurchased === true &&
        <span className='is-purachased'>Purchased</span>
      }
    </StyledModule>
  )
}

Module.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string,
  isPurchased: PropTypes.bool,
  onClick: PropTypes.func
}

Module.defaultProps = {
  isPurchased: false,
  price: 'Free',
  onClick: () => {}
}

export default Module
