import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Switch from './Switch'

jest.mock('uuid', () => jest.fn().mockReturnValue('id'))

it('renders checked', () => {
  const tree = renderer
    .create(
      <Switch checked>Switch (checked)</Switch>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders unchecked', () => {
  const tree = renderer
    .create(
      <Switch checked={false}>Switch (unchecked)</Switch>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
