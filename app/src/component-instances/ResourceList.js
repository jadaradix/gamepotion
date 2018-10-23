import React, { Fragment } from 'react'
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

const choose = (resource) => {
  console.warn('[ResourceList] [choose]', resource)
}

const ResourceList = ({ resources }) => {
  return (
    <List>
      {resourceTypes.map(rt => {
        return (
          <Fragment key={`rt-${rt.type}`}>
            <ListItem icon={icons.generic.folder}>{rt.name}</ListItem>
            <List>
              {resources.filter(r => r.type === rt.type).map(r => <ListItem key={r.id} icon={icons.resources[rt.type]}>{r.name}</ListItem>)}
            </List>
          </Fragment>
        )
      })}
    </List>
  )
}

ResourceList.propTypes = {
  resources: PropTypes.array.isRequired
}

export default ResourceList
