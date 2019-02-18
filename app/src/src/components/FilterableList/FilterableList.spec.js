import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import FilterableList from './FilterableList'
import ListItem from '../ListItem/ListItem'

jest.mock('uuid', () => jest.fn().mockReturnValue('id'))

it('renders', () => {
  const tree = renderer
    .create(
      <FilterableList>
        <ListItem id='list-item-1'>List Item 1</ListItem>
        <ListItem id='list-item-2'>List Item 2</ListItem>
      </FilterableList>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
