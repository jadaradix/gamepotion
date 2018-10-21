import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Toolbar from './Toolbar'

it('renders', () => {
  const tree = renderer
    .create(<Toolbar></Toolbar>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
