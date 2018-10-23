import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Input from './Input'

it('renders', () => {
  const tree = renderer
    .create(
      <Input value='James' />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
