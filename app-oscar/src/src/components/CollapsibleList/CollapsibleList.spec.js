import React from 'react'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'
import 'jest-styled-components'
import CollapsibleList from './CollapsibleList'
import ListItem from '../ListItem/ListItem'

jest.mock('uuid', () => jest.fn().mockReturnValue('id'))

it('renders', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <CollapsibleList label='stuff'>
          <ListItem id='list-item-1'>List Item 1</ListItem>
          <ListItem id='list-item-2'>List Item 2</ListItem>
        </CollapsibleList>
      </MemoryRouter>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
