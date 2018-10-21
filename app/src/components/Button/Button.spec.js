import React from 'react'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'
import 'jest-styled-components'
import Button from './Button'

it('renders', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <Button>Do Something</Button>
      </MemoryRouter>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
