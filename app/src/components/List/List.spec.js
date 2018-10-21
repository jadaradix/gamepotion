import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import List from './List'

it('renders', () => {
  const tree = renderer
    .create(
      <List>...</List>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
