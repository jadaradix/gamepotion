import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Modal from '../components/Modal/Modal'
import Heading1 from '../components/Heading1/Heading1'
import Button from '../react-components/Button/Button'

const StyledModal = styled.div`
  .component--modal {
    .component--heading1 {
      margin-bottom: 2rem;
    }
    p {
      
    }
    .decision {
      background-color: green;
    }
  }
`

const BuyProModal = ({ onGood, onBad }) => {
  return (
    <StyledModal>
      <Modal onClose={onBad}>
        <Heading1>Buy Pro</Heading1>
        <p>
          Hi
        </p>
        <div className='decision'>
          <Button onClick={onGood}>Buy Pro ($10)</Button>
        </div>
      </Modal>
    </StyledModal>
  )
}

BuyProModal.propTypes = {
  onGood: PropTypes.func,
  onBad: PropTypes.func,
}

BuyProModal.defaultProps = {
  onGood: () => {},
  onBad: () => {}
}

export default BuyProModal
