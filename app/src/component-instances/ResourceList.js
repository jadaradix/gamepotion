import React, { Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import icons from '../icons'

import List from '../components/List/List'
import ListItem from '../components/ListItem/ListItem'

import resourceTypes from '../resourceTypes'

const StyledResourceList = styled.div`
`

const ResourceList = ({ resources, currentResource, onLoad, onRename, onDelete }) => {
  const onAction = (id, action) => {
    const actions = {
      'rename': () => {
        onRename(resources.find(r => r.id === id))
      },
      'delete': () => {
        onDelete(resources.find(r => r.id === id))
      }
    }
    const foundAction = actions[action]
    if (typeof foundAction === 'function') {
      actions[action]()
    }
  }

  return (
    <StyledResourceList className='component--resource-list'>
      <List>
        {resourceTypes.map(rt => {
          return (
            <Fragment key={`rt-${rt.type}`}>
              <ListItem id={`resource-type-${rt.type}`} icon={icons.generic.folder}>{rt.namePlural}</ListItem>
              <List>
                {resources.filter(r => r.type === rt.type).map(r => <ListItem onChoose={(id) => onLoad(resources.find(r => r.id === id))} key={r.id} id={r.id} icon={icons.resources[rt.type]} selected={r === currentResource} actions={['rename', 'delete']} onAction={onAction}>{r.name}</ListItem>)}
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
  onLoad: PropTypes.func,
  onRename: PropTypes.func,
  onDelete: PropTypes.func
}

ResourceList.defaultProps = {
  onLoad: () => {},
  onRename: () => {},
  onDelete: () => {}
}

export default ResourceList
