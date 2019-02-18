import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import ImageChooser from './ImageChooser'

jest.mock('uuid', () => jest.fn().mockReturnValue('id'))

it('renders', () => {
  const images = [
    {
      id: 'xyz',
      name: 'Xyz',
      url: 'xyz'
    }
  ]
  const tree = renderer
    .create(
      <ImageChooser id='test' images={images} currentImage='xyz' />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
