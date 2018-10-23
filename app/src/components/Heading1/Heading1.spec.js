import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Heading1 from './Heading1'

it('renders', () => {
  const tree = renderer
    .create(
      <Heading1>Hello, World</Heading1>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
