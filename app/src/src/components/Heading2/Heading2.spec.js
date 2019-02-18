import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Heading2 from './Heading2'

it('renders', () => {
  const tree = renderer
    .create(
      <Heading2>Hello, World</Heading2>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
