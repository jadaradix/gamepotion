import React, { PureComponent, Fragment } from 'react'
import MainToolbar from '../component-instances/MainToolbar'
import ResponsiveContainer from '../component-instances/ResponsiveContainer'
import icons from '../icons'
import Button from '../components/Button/Button'
import List from '../components/List/List'
import ListItem from '../components/ListItem/ListItem'

class Projects extends PureComponent {
  render() {
    return (
      <Fragment>
        <MainToolbar />
        <ResponsiveContainer>
          <Button hint='New Project' route='/projects/new'>New Project</Button>
          <List>
            <ListItem icon={icons.generic.project}>Project 1</ListItem>
            <ListItem icon={icons.generic.project}>Project 2</ListItem>
            <ListItem icon={icons.generic.project}>Project 3</ListItem>
          </List>
        </ResponsiveContainer>
      </Fragment>
    )
  }
}

export default Projects
