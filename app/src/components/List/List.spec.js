import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import List from './List'
import ListItem from '../ListItem/ListItem'

it('renders', () => {
  const tree = renderer
    .create(
      <List>
        <ListItem id='list-item-1'>List Item 1</ListItem>
        <ListItem id='list-item-2'>List Item 2</ListItem>
      </List>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
