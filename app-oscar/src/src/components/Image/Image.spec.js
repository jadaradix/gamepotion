import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Image from './Image'

it('renders', () => {
  const tree = renderer
    .create(
      <Image src='xyz' />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
