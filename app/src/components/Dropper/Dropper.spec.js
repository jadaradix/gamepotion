import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Dropper from './Dropper'

jest.mock('uuid', () => jest.fn().mockReturnValue('id'))

it('renders', () => {
  const options = [
    {
      id: 'option-1',
      name: 'Option 1'
    },
    {
      id: 'option-2',
      name: 'Option 2'
    },
    {
      id: 'option-3',
      name: 'Option 3'
    }
  ]
  const tree = renderer
    .create(
      <Dropper options={options} />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
