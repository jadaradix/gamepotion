import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import ListItem from './ListItem'

it('renders', () => {
  const tree = renderer
    .create(
      <ListItem icon=''>Hello, World</ListItem>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
