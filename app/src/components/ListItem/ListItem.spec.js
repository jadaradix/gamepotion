import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import ListItem from './ListItem'

it('renders', () => {
  const tree = renderer
    .create(
      <ListItem id='list-item-1'>List Item 1</ListItem>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
