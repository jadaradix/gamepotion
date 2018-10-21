import React from 'react'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'
import 'jest-styled-components'
import ToolbarButton from './ToolbarButton'

it('renders', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <ToolbarButton route='/' icon='' hint='Qwe' />
      </MemoryRouter>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
