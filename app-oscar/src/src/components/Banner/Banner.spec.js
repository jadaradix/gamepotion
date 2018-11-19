import React from 'react'
import 'jest-styled-components'
import { shallow } from 'enzyme'
import Banner from './Banner'

describe('<Banner />', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should render component', () => {
    const wrapper = shallow(
      <Banner>Hi.</Banner>
    )
    expect(wrapper).toMatchSnapshot()
  })
})
