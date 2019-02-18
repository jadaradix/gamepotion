import React from 'react'
import renderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router-dom'
import 'jest-styled-components'
import AudioPlayer from './AudioPlayer'

window.HTMLMediaElement.prototype.load = jest.fn()

it('renders', () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <AudioPlayer url='xyz' />
      </MemoryRouter>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
