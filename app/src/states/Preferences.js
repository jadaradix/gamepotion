import React, { PureComponent, Fragment } from 'react'
import MainToolbar from '../component-instances/MainToolbar'
import ResponsiveContainer from '../component-instances/ResponsiveContainer'
import icons from '../icons'
import List from '../components/List/List'
import ListItem from '../components/ListItem/ListItem'

const resources = {
  'images': [
    {
      id: 'image-1',
      name: 'Image 1'
    },
    {
      id: 'image-2',
      name: 'Image 2'
    }
  ],
  'sounds': [
    {
      id: 'sound-1',
      name: 'Sound 1'
    },
    {
      id: 'sound-2',
      name: 'Sound 2'
    }
  ]
}

class Preferences extends PureComponent {
  render() {
    return (
      <Fragment>
        <MainToolbar />
        <ResponsiveContainer>
          <List>
            <ListItem icon={icons.generic.projects}>Images</ListItem>
            <List>
              {resources.images.map(r => <ListItem key={r.id} icon={icons.generic.projects}>{r.name}</ListItem>)}
            </List>
            <ListItem icon={icons.generic.projects}>Sounds</ListItem>
            <List>
              {resources.sounds.map(r => <ListItem key={r.id} icon={icons.generic.projects}>{r.name}</ListItem>)}
            </List>
          </List>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default Preferences
