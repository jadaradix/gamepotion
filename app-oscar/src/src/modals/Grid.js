import React, {PureComponent} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Modal from '../components/Modal/Modal'
import Switch from '../components/Switch/Switch'
import Input from '../components/Input/Input'
import Button from '../react-components/Button/Button'

const StyledModal = styled.div`
  .component--modal {
    .component--switch {
      margin-bottom: 2rem;
    }
    .grid-properties {
      display: grid;
      grid-template-columns: 2fr 2fr;
      grid-gap: 1rem;
      margin-bottom: 2rem;
    }
    .component--button {
    }
  }
`

class GridModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      on: props.on,
      width: props.width,
      height: props.height      
    }
    this.onChangeProp = this.onChangeProp.bind(this)
    this.handleOnGood = this.handleOnGood.bind(this)
  }

  onChangeProp(prop, value) {
    this.setState({
      [prop]: value
    })
  }

  handleOnGood() {
    this.props.onGood(this.state)
  }

  render() {
    return (
      <StyledModal>
        <Modal onClose={this.props.onBad}>
          <Switch checked={this.state.on} onChange={(v) => this.onChangeProp('on', v)}>Grid</Switch>
          <div className='grid-properties'>
            <Input label='Width' value={this.state.width} disabled={!this.state.on} type='number' min='4' max='256' onChange={(v) => this.onChangeProp('width', parseInt(v, 10))} onDone={this.handleOnGood} />
            <Input label='Height' value={this.state.height} disabled={!this.state.on} type='number' min='4' max='256' onChange={(v) => this.onChangeProp('height', parseInt(v, 10))} onDone={this.handleOnGood} />
          </div>
          <Button onClick={this.handleOnGood}>Done</Button>
        </Modal>
      </StyledModal>
    )
  }
}

GridModal.propTypes = {
  on: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  onGood: PropTypes.func,
  onBad: PropTypes.func
}

GridModal.defaultProps = {
  onGood: () => {},
  onBad: () => {}
}

export default GridModal
