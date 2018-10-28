import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import icons from '../icons'

import Heading1 from '../components/Heading1/Heading1'
import Button from '../components/Button/Button'

const StyledResource = styled.div`
  .heading {
    // background-color: red;
    > img {
      display: block;
      float: left;
      width: 2rem;
      height: 2rem;
      margin: 0.55rem 0 0.45rem 0;
      // background-color: blue;
    }
    > .component--heading1 {
      height: 3rem;
      line-height: 3rem;
      margin-left: 3rem;
      // background-color: green;
    }
  }
`

const Resource = ({ resource, onUpdate }) => {
  return (
    <StyledResource className='component--resource'>
      <div className='heading'>
        <img src={icons.resources[resource.type]} alt={'nice'} />
        <Heading1>{resource.name}</Heading1>
      </div>
    </StyledResource>
  )
}

Resource.propTypes = {
  resource: PropTypes.object,
  onUpdate: PropTypes.func
}

Resource.defaultProps = {
  onUpdate: () => {}
}

export default Resource
