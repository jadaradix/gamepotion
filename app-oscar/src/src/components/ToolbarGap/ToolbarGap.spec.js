import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import ToolbarGap from './ToolbarGap'

it('renders', () => {
  const tree = renderer
    .create(
      <ToolbarGap />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
