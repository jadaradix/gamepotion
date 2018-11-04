import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Modal from './Modal'

it('renders', () => {
  const tree = renderer
    .create(
      <Modal>
        Hello, World.
      </Modal>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
