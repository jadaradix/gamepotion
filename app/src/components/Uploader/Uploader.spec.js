import React from 'react'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Uploader from './Uploader'

describe('Uploader', () => {
  it('renders', () => {
    const tree = renderer
      .create(
        <Uploader />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  
  it('renders disabled', () => {
    const tree = renderer
      .create(
        <Uploader disabled />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})


