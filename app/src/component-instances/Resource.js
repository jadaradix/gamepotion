import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import icons from '../icons'
import resourceTypes from '../resourceTypes'

import Heading1 from '../components/Heading1/Heading1'

const StyledResource = styled.div`
  .heading {
    margin-bottom: 1rem;
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

const getComponent = (resources, resource, onUpdate) => {
  const FoundResourceType = resourceTypes.find(r => r.type === resource.type).component
  return <FoundResourceType resources={resources} resource={resource} onUpdate={onUpdate} />
}

const Resource = ({ resources, resource, onUpdate }) => {
  // console.warn('[component-Resource] resource', resource)
  return (
    <StyledResource className='component--resource'>
      <div className='heading'>
        <img src={icons.resources[resource.type]} alt={'nice'} />
        <Heading1>{resource.name}</Heading1>
      </div>
      {getComponent(resources, resource, onUpdate)}
    </StyledResource>
  )
}

Resource.propTypes = {
  resources: PropTypes.array.isRequired,
  resource: PropTypes.object.isRequired,
  onUpdate: PropTypes.func
}

Resource.defaultProps = {
  onUpdate: () => {}
}

export default Resource
