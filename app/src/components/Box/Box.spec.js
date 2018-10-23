import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Box from './Box'

it('renders', () => {
  const tree = renderer
    .create(
      <Box>Hello, World</Box>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
