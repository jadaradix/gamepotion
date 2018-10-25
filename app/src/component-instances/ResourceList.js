import React, { PureComponent, Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import icons from '../icons'

import List from '../components/List/List'
import ListItem from '../components/ListItem/ListItem'

const resourceTypes = [
  {
    name: 'Images',
    type: 'image'
  },
  {
    name: 'Sounds',
    type: 'sound'
  },
  {
    name: 'Atoms',
    type: 'atom'
  },
  {
    name: 'Spaces',
    type: 'space'
  }
]

const StyledResourceList = styled.div`
`

const ResourceList = ({ resources, currentResource, loadResource }) => {
  return (
    <StyledResourceList className='component--resource-list'>
      <List>
        {resourceTypes.map(rt => {
          return (
            <Fragment key={`rt-${rt.type}`}>
              <ListItem id={`resource-type-${rt.type}`} icon={icons.generic.folder}>{rt.name}</ListItem>
              <List>
                {resources.filter(r => r.type === rt.type).map(r => <ListItem onChoose={(id) => loadResource(id)} key={r.id} id={r.id} icon={icons.resources[rt.type]} selected={r === currentResource}>{r.name}</ListItem>)}
              </List>
            </Fragment>
          )
        })}
      </List>
    </StyledResourceList>
  )
}

ResourceList.propTypes = {
  resources: PropTypes.array.isRequired,
  currentResource: PropTypes.oneOf([
    PropTypes.null,
    PropTypes.object
  ]),
  loadResource: PropTypes.func 
}

ResourceList.defaultProps = {
  loadResource: () => {}
}

export default ResourceList
