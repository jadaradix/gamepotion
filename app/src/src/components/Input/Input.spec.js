import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Input from './Input'

jest.mock('uuid', () => jest.fn().mockReturnValue('id'))

it('renders', () => {
  const tree = renderer
    .create(
      <Input value='hey there' />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
