import React, { PureComponent, Fragment } from 'react'
import MainToolbar from '../component-instances/MainToolbar'
import ResponsiveContainer from '../component-instances/ResponsiveContainer'
import icons from '../icons'
import List from '../components/List/List'
import ListItem from '../components/ListItem/ListItem'

const resources = [
  {
    type: 'image',
    id: 'image-1',
    name: 'Image 1'
  },
  {
    type: 'image',
    id: 'image-2',
    name: 'Image 2'
  },
  {
    type: 'sound',
    id: 'sound-1',
    name: 'Sound 1'
  },
  {
    type: 'sound',
    id: 'sound-2',
    name: 'Sound 2'
  },
  {
    type: 'atom',
    id: 'atom-1',
    name: 'Atom 1'
  },
  {
    type: 'atom',
    id: 'atom-2',
    name: 'Atom 2'
  },
  {
    type: 'space',
    id: 'space-1',
    name: 'Space 1'
  },
  {
    type: 'space',
    id: 'space-2',
    name: 'Space 2'
  }
]

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

class Preferences extends PureComponent {
  render() {
    return (
      <Fragment>
        <MainToolbar />
        <ResponsiveContainer>
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
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default Preferences
