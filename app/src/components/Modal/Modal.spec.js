import React from 'react'
import 'jest-styled-components'
import { shallow } from 'enzyme'
import Modal from './Modal'

describe('<Modal />', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should render component', () => {
    const wrapper = shallow(
      <Modal />
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should trigger onClose with the close button', () => {
    const close = jest.fn()
    const wrapper = shallow(<Modal onClose={close} />)
    wrapper
      .find('.icon--close')
      .at(0)
      .simulate('click', {})
    expect(close).toHaveBeenCalled()
  })

  it('should trigger onClose with the escape key', () => {
    const close = jest.fn()
    const wrapper = shallow(<Modal onClose={close} />)
    const element = wrapper.find('[data-overlay]').at(0)
    element.simulate('keyDown', { key: 'Escape', keyCode: 27, which: 27 })
    expect(close).toHaveBeenCalled()
  })
})
