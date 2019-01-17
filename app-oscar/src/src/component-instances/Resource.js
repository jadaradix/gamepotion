import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import icons from '../icons'
import resourceTypes from '../resourceTypes'

import CustomHelmet from '../component-instances/CustomHelmet'
import Heading1 from '../components/Heading1/Heading1'
import Button from '../components/Button/Button'

const StyledResource = styled.div`
  max-width: 960px;
  // background-color: yellow;
  .heading {
    height: 3rem;
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
      float: left;
      height: 3rem;
      line-height: 3rem;
      margin-left: 1rem;
      // background-color: green;
    }
    > .component--button {
      float: left;
      margin-top: 0.3rem;
      margin-left: 0.5rem;
      padding: 0.25rem;
      opacity: 0.5;
      > img {
        height: 1.5rem;
      }
    }
  }
`

const getComponent = (moduleIds, project, resources, resource, localSettings, onUpdateLocalSetting, onUpdate) => {
  const FoundResourceType = resourceTypes.find(r => r.type === resource.type).component
  return <FoundResourceType moduleIds={moduleIds} project={project} resources={resources} resource={resource} localSettings={localSettings} onUpdate={onUpdate} onUpdateLocalSetting={onUpdateLocalSetting} />
}

const rename = (resource, onUpdate) => {
  const name = window.prompt(`What would you like to call ${resource.name}?`, resource.name)
  if (name === null || name.length === 0) {
    return
  }
  onUpdate({
    name
  })
}

const Resource = ({ moduleIds, project, resources, resource, localSettings, onUpdateLocalSetting, onUpdate }) => {
  // console.warn('[component-Resource] resource', resource)
  return (
    <StyledResource className='component--resource'>
      <CustomHelmet
        title={`${resource.name} - ${project.name}`}
      />
      <div className='heading'>
        <img src={icons.resources[resource.type]} alt='' />
        <Heading1>{resource.name}</Heading1>
        <Button flavour='weak' icon={icons.generic.actions.edit} onClick={() => rename(resource, onUpdate)}></Button>
      </div>
      {getComponent(moduleIds, project, resources, resource, localSettings, onUpdateLocalSetting, onUpdate)}
    </StyledResource>
  )
}

Resource.propTypes = {
  moduleIds: PropTypes.array.isRequired,
  project: PropTypes.object.isRequired,
  resources: PropTypes.array.isRequired,
  resource: PropTypes.object.isRequired,
  localSettings: PropTypes.object.isRequired,
  onUpdate: PropTypes.func,
  onUpdateLocalSetting: PropTypes.func
}

Resource.defaultProps = {
  onUpdate: () => {},
  onUpdateLocalSetting: () => {}
}

export default Resource
