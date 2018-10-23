import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Loading from './Loading'

it('renders', () => {
  const tree = renderer
    .create(
      <Loading />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
